const { sequelize } = require('./models');
const { Feed, Source } = require("./models");

async function list(limit=21) {
    return await Feed.findAll({
      limit: limit,
      order: sequelize.random()
      }
    );
  }
  
  async function findFeedsByUserId(userId, limit=50) {
    return await Feed.findAll(
      {
        where: { userId },
        limit: limit,
        include: Source
      }
    );
  }
  
  async function findFeedByPK(id) {
    return await Feed.findOne(
      {
        where: { id },
        include: Source
      }
    );
  }
  
  async function createFeed(feedData) {
    newFeed = await Feed.create(feedData);
    return newFeed;
  }
  
  async function deleteFeed(feedId) {
    const feed = await Feed.findOne(
      {
        where: { id:feedId },
      }
    );
    feed.destroy()
  }

  module.exports = {
    list,
    findFeedsByUserId,
    findFeedByPK,
    createFeed,
    deleteFeed
  };
  