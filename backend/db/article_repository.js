const { sequelize } = require('./models');
const { Article } = require("./models");

async function list(limit=20) {
    return await Article.findAll({
      limit: limit,
      // order: sequelize.random()
      }
    );
  }
  
  async function findArticleByUserId(userId, limit=50) {
    return await Article.findAll(
      {
        where: { userId },
        limit: limit,
        include: Source
      }
    );
  }
  
  async function findArticleByPK(id) {
    return await Article.findOne(
      {
        where: { id },
        include: Source
      }
    );
  }
  
  async function createArticle(articleData) {
    newArticle = await Article.create(articleData);
    return newArticle;
  }
  
  async function deleteArticle(feedId) {
    const feed = await Article.findOne(
      {
        where: { id:feedId },
      }
    );
    feed.destroy()
  }

  module.exports = {
    list,
    findArticleByUserId,
    findArticleByPK,
    createArticle,
    deleteArticle
  };
  