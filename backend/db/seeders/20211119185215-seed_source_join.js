'use strict';

const seedData = [
  {
    sourceId:1,
    feedId:1
  },
  {
    sourceId:2,
    feedId:1
  },
  {
    sourceId:3,
    feedId:2
  },
  {
    sourceId:4,
    feedId:2
  },
  {
    sourceId:5,
    feedId:3
  }
]

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('Source_joins', seedData, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Source_joins', null, {});
  }
};
