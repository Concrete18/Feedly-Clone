'use strict';


const seed_data = [
  {
    name:'CNN',
    url: 'http://rss.cnn.com/rss/cnn_topstories.rss'
  },
  {
    name:'NY TIMES',
    url: 'http://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml'
  },
  {
    name:'TechRadar',
    url: 'http://www.techradar.com/rss'
  },
  {
    name:'PlayStation.Blog',
    url: 'https://blog.playstation.com/feed/'
  }
]

let sources = []
for (const entry of seed_data) {
  let source_obj = {
    name: entry.name,
    url: entry.url, 
    createdAt: new Date(),
    updatedAt: new Date()
  }
  sources.push(source_obj);
}

const sources_urls = {
  "http://feeds.bbci.co.uk/news/world/rss.xml": 1,
  "https://www.politico.com/rss/politics08.xml": 1,
  "https://www.theringer.com/rss/index.xml": 1,
  "http://www.politico.com/rss/congress.xml": 1,
  "https://www.polygon.com/rss/index.xml": 1,
  "http://feeds.feedburner.com/TechCrunch/": 1,
  'https://www.huffpost.com/section/front-page/feed?x=1': 1,
  "http://www.espn.com/espn/rss/news": 1,
  "https://www.boston.com/tag/local-news/feed": 1,
  "https://feeds.thedailybeast.com/summary/rss/articles": 1,
  "https://www.wired.com/feed/rss": 1
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Sources', sources, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Sources', null, {});
  }
};
