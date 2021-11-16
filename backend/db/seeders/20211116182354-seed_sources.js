'use strict';

const sources = [
  'https://feeds.simplecast.com/54nAGcIl',
  'http://rss.cnn.com/rss/cnn_topstories.rss',
  'https://archive.nytimes.com/www.nytimes.com/services/xml/rss/index.html?mcubz=0',
  'https://www.huffpost.com/section/front-page/feed?x=1'
]

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Sources', sources, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Sources', null, {});
  }
};
