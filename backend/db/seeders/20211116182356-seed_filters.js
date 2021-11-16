'use strict';

const filters = []

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Filters', filters, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Filters', null, {});
  }
};
