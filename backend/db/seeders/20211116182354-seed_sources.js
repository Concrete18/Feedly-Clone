'use strict';

const sources_urls = [
  'https://feeds.simplecast.com/54nAGcIl',
  'http://rss.cnn.com/rss/cnn_topstories.rss',
  'https://archive.nytimes.com/www.nytimes.com/services/xml/rss/index.html?mcubz=0',
  'https://www.huffpost.com/section/front-page/feed?x=1'
]

let sources = []
for (let i = 0; i < sources_urls.length; i++) {
  let source_obj = {
    feedId: 1,
    name: `Test Feed ${i+1}`,
    url: sources_urls[i], 
    createdAt: new Date(),
    updatedAt: new Date()
  }
  sources.push(source_obj);
};

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Sources', sources, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Sources', null, {});
  }
};
