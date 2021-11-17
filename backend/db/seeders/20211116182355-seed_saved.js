'use strict';

const saved = [
  {
    articleId: 1,
    userId: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  }
]

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Saved', saved, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Saved', null, {});
  }
};
