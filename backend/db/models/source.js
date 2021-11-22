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
      // Source.hasMany(models.Article, {foreignKey:'sourceId'});

      // Source.belongsToMany(models.Article, {
      //   through: 'ArticleJoin',
      //   otherKey: 'sourceId',
      //   foreignKey: 'articleId'
      // });
    }
  };
  Source.init({
    userId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    url: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Source',
  });
  return Source;
};
