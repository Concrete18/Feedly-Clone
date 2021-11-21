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
      sourceId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'Sources' }
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING(600)
      },
      creator: {
        type: Sequelize.STRING(200)
      },
      pubDate: {
        type: Sequelize.DATE
      },
      content: {
        type: Sequelize.STRING(600)
      },
      contentSnippet: {
        type: Sequelize.STRING(600)
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
