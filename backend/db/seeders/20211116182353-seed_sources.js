"use strict";
// TODO remove NY Times

const seedData = [
  // gaming
  {
    name: "Polygon",
    url: "https://www.polygon.com/rss/index.xml",
    feedId: 1,
    userId: 1,
  },
  {
    name: "Playstation Blog",
    url: "https://blog.playstation.com/feed/",
    feedId: 1,
    userId: 1,
  },
  // news
  {
    // TODO replace
    name: "NY Times",
    url: "http://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml",
    feedId: 2,
    userId: 1,
  },
  // tech
  {
    name: "TechRadar",
    url: "http://www.techradar.com/rss",
    feedId: 3,
    userId: 1,
  },
  {
    // TODO replace
    name: "Wired",
    url: "https://www.wired.com/feed/rss",
    feedId: 3,
    userId: 1,
  },
];
// TODO add
// https://kotaku.com
// https://gizmodo.com/rss

let sources = [];
for (const entry of seedData) {
  const source_obj = {
    userId: entry.userId,
    feedId: entry.feedId,
    name: entry.name,
    url: entry.url,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  sources.push(source_obj);
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Sources", sources, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Sources", null, {});
  },
};
