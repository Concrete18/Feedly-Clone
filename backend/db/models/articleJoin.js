'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ArticleJoin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ArticleJoin.belongsTo(models.User, {foreignKey:'userId'})
      ArticleJoin.belongsTo(models.Feed, {foreignKey:'feedId'})
      ArticleJoin.belongsTo(models.Source, {foreignKey:'sourceId'})
      ArticleJoin.belongsTo(models.Article, {foreignKey:'articleId'})
    }
  };
  ArticleJoin.init({
    userId: DataTypes.INTEGER,
    feedId: DataTypes.INTEGER,
    sourceId: DataTypes.INTEGER,
    articleId: DataTypes.INTEGER,
    read: DataTypes.BOOLEAN,
    saved: DataTypes.BOOLEAN,
    savedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'ArticleJoin',
  });
  return ArticleJoin;
};
