'use strict';

const filters = [
  {
    user_id: 1,
    filter_string: 'Test',
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
