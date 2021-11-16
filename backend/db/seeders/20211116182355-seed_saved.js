'use strict';

const saved = []

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Saved', saved, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Saved', null, {});
  }
};
