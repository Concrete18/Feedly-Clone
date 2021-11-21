'use strict';
// const seedData = require('./articleData.json')

const seedData = [
  {
    "sourceId": 1,
    "title": "title",
    "creator": "author",
    "content": "content",
    "contentSnippet": "content",
    "url": "url"
  }
]

const articles = []


for (let article of seedData) {
  const obj = {
    sourceId: article.sourceId,
    title: article.title,
    creator: article.creator,
    pubDate: new Date(),
    content: article.content,
    contentSnippet: article.contentSnippet,
    url: article.url,
    createdAt: new Date(),
    updatedAt: new Date()
  }
  articles.push(obj)
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Articles', articles, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Articles', null, {});
  }
};
