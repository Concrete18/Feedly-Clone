'use strict';

const seedData = [
  {
    name: 'CNN',
    url: 'http://rss.cnn.com/rss/cnn_topstories.rss',
    feedId: 1,
    userId: 1
  },
  {
    name: 'NY Times',
    url: 'http://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml',
    feedId: 1,
    userId: 1
  },
  {
    name: 'TechRadar',
    url: 'http://www.techradar.com/rss',
    feedId: 2,
    userId: 1
  },
  {
    name: 'Playstation Blog',
    url: 'https://blog.playstation.com/feed/',
    feedId: 3,
    userId: 1
  },
  {
    name: 'Valve News Feed',
    url: 'https://store.steampowered.com/feeds/news.xml',
    feedId: 3,
    userId: 1
  },
  {
    name: 'Polygon',
    url: 'https://www.polygon.com/rss/index.xml',
    feedId: 3,
    userId: 1
  },
  {
    name: 'ESPN',
    url: 'http://www.espn.com/espn/rss/news',
    feedId: 4,
    userId: 1
  },
  {
    name: 'Wired',
    url: 'https://www.wired.com/feed/rss',
    feedId: 2,
    userId: 1
  }
]

let sources = []
for (const entry of seedData) {
  const source_obj = {
    userId: entry.userId,
    feedId: entry.feedId,
    name: entry.name,
    url: entry.url, 
    createdAt: new Date(),
    updatedAt: new Date()
  }
  sources.push(source_obj);
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Sources', sources, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Sources', null, {});
  }
};
