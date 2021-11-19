'use strict';

const articles = []
for (let i = 0; i <= 10; i++) {
  const obj = {
    sourceId: 1,
    name: `Test Article ${i}`,
    url: 'testArticle.com',
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
