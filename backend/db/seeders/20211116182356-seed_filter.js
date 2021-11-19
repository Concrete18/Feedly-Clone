'use strict';

const filters = [
  {
    userId: 1,
    filterString: 'Test',
    createdAt: new Date(),
    updatedAt: new Date()
  }
]

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Filters', filters, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Filters', null, {});
  }
};
