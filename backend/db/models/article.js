'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Article extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Article.belongsToMany(models.Source, {
      //   through: 'ArticleJoin',  
      //   otherKey: 'ArticleId',
      //   foreignKey: 'sourceId'
      // })
    }
  };
  Article.init({
    title: DataTypes.STRING,
    websiteName: DataTypes.STRING,
    creator: DataTypes.STRING,
    pubDate: DataTypes.STRING,
    image: DataTypes.STRING,
    content: DataTypes.STRING,
    contentSnippet: DataTypes.STRING,
    url: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Article',
  });
  return Article;
};
