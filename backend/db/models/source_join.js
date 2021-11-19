'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Source_join extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Source_join.belongsTo(models.Source, {foreignKey:'sourceId'})
      Source_join.belongsTo(models.Feed, {foreignKey:'feedId'})
    }
  };
  Source_join.init({
    feedId: DataTypes.INTEGER,
    sourceId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Source_join',
    tableName: 'Source_joins',
  });
  return Source_join;
};
