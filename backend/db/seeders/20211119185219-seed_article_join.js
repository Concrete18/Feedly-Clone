'use strict';

const seedData = [
  {
    sourceId:1,
    articleId:1
  },
  {
    sourceId:2,
    articleId:1
  },
  {
    sourceId:3,
    articleId:2
  },
  {
    sourceId:4,
    articleId:2
  },
  {
    sourceId:5,
    articleId:3
  }
]

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('Article_joins', seedData, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Article_joins', null, {});
  }
};
