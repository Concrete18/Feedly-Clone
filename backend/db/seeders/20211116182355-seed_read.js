'use strict';

const reads = [
  {
    articleId: 1,
    userId: 1,
    read: false,
    createdAt: new Date(),
    updatedAt: new Date()
  }
]

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Reads', reads, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Reads', null, {});
  }
};
