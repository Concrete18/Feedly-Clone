'use strict';

const feeds = [
  {
    owner_id: 1,
    name: 'Test Feed',
    createdAt: new Date(),
    updatedAt: new Date()
  }
]

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Feeds', feeds, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Feeds', null, {});
  }
};
