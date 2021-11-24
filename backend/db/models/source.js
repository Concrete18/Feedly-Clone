'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Source extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {   
      Source.hasMany(models.ArticleJoin, {
        foreignKey:'sourceId',
        onDelete: 'CASCADE',
        hooks: true
      });
    }
  };
  Source.init({
    name: DataTypes.STRING,
    url: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Source',
  });
  return Source;
};
