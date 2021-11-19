'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Article_join extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Article_join.belongsTo(models.Article, {foreignKey:'articleId'})
      // Article_join.belongsTo(models.Source, {foreignKey:'sourceId'})
    }
  };
  Article_join.init({
    articleId: DataTypes.INTEGER,
    sourceId: DataTypes.INTEGER
  },{
    sequelize,
    modelName: 'Article_join',
    tableName: 'Article_joins',
  });
  return Article_join;
};
