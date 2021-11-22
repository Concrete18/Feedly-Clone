'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ArticleJoins', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'Users' }
      },
      feedId: {
        type: Sequelize.INTEGER,
        references: { model: 'Feeds' }
      },
      sourceId: {
        type: Sequelize.INTEGER,
        references: { model: 'Sources' }
      },
      articleId: {
        type: Sequelize.INTEGER,
        references: { model: 'Articles' }
      },
      createdAt: {
        type: Sequelize.DATE
      },
      updatedAt: {
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('ArticleJoins');
  }
};
