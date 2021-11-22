'use strict';

const feeds = [
  {
    userId: 1,
    name: 'News',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    userId: 1,
    name: 'Technology',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    userId: 1,
    name: 'Gaming',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    userId: 1,
    name: 'Sports',
    createdAt: new Date(),
    updatedAt: new Date()
  },
]

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Feeds', feeds, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Feeds', null, {});
  }
};
