'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Articles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING(600)
      },
      websiteName: {
        type: Sequelize.STRING(600)
      },
      creator: {
        type: Sequelize.STRING(300)
      },
      pubDate: {
        type: Sequelize.DATE
      },
      content: {
        type: Sequelize.STRING(10000)
      },
      contentSnippet: {
        type: Sequelize.STRING(10000)
      },
      image: {
        type: Sequelize.STRING(1000)
      },
      url: {
        allowNull: false,
        type: Sequelize.STRING(600)
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Articles');
  }
};
