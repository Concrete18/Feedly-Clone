"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Article extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Article.hasMany(models.ArticleJoin, {
        foreignKey: "articleId",
        onDelete: "CASCADE",
        hooks: true,
      });
    }
  }
  Article.init(
    {
      title: DataTypes.STRING,
      websiteName: DataTypes.STRING,
      pubDate: DataTypes.STRING,
      image: DataTypes.STRING,
      content: DataTypes.STRING,
      contentSnippet: DataTypes.STRING,
      url: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Article",
    }
  );
  return Article;
};
