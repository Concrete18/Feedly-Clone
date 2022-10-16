"use strict";

// TODO add seeded articles

const seedData = [
  // gaming
  {
    title: "Arcane Wins an Emmy as Riot Games Releases Making Of Documentary",
    websiteName: "Gizmodo",
    image:
      "https://i.kinja-img.com/gawker-media/image/upload/c_fit,f_auto,g_center,pg_1,q_60,w_965/d33248d97defac6601b812d64124c3a8.jpg",
    content:
      "2021 saw the debut of Arcane on Netflix, and proceeded to grab everyone’s attention. Whether you were a fan of League of Legends or going in completely blind, the CG series became a critical and fan darling that continued Netflix’s pretty good streak of video game adaptations. But if that weren’t enough, the show now has the prestige to further back up its acclaim.",
    contentSnippet:
      "The making of the hit Netflix series is as interesting as the show itself.",
    url: "https://gizmodo.com/arcane-netflix-emmy-win-bridging-the-rift-videos-1849495829",
  },
  {
    title: "Synergy is a new, ecology-themed, sci-fi settlement builder",
    websiteName: "Destructoid",
    image:
      "https://www.destructoid.com/wp-content/uploads/2022/06/synergy-pc-trailer-strategy.jpg?w=640",
    content:
      "Leikir Studios and Goblinz Publishing have premiered the debut trailer for Synergy, a new, ecology-themed city builder in development for PC.",
    contentSnippet:
      "Leikir Studios and Goblinz Publishing have premiered the debut trailer for Synergy, a new, ecology-themed city builder in development for PC.",
    url: "https://www.destructoid.com/synergy-city-builder-pc-strategy-ecology/?utm_source=feedly&utm_medium=rss&utm_campaign=synergy-city-builder-pc-strategy-ecology",
  },
  {
    title: "World's Largest Four-Day Work Week Experiment Begins",
    websiteName: "Gizmodo",
    image:
      "https://i.kinja-img.com/gawker-media/image/upload/c_fit,f_auto,g_center,pg_1,q_60,w_965/9d8894e2cc1ca8c49f090ddf0f041a6e.jpg",
    content:
      "Thousands of UK employees will work 80% of the traditional work week while maintaining 100% of their salaries.",
    contentSnippet:
      "Thousands of UK employees will work 80% of the traditional work week while maintaining 100% of their salaries.",
    url: "https://gizmodo.com/four-day-work-week-wfh-remote-work-return-to-office-1849022441",
  },
  // {
  //   title: "placeholder",
  //   websiteName: "placeholder",
  //   image: "placeholder",
  //   content: "placeholder",
  //   contentSnippet: "placeholder",
  //   url: "placeholder",
  // },
  // {
  //   title: "placeholder",
  //   websiteName: "placeholder",
  //   image: "placeholder",
  //   content: "placeholder",
  //   contentSnippet: "placeholder",
  //   url: "placeholder",
  // },
];

let articles = [];
for (const entry of seedData) {
  const article_obj = {
    title: entry.title,
    websiteName: entry.websiteName,
    pubDate: "2021-06-12T21:37:15+00:00",
    image: entry.image,
    content: entry.content,
    contentSnippet: entry.contentSnippet,
    url: entry.url,

    createdAt: new Date(),
    updatedAt: new Date(),
  };
  articles.push(article_obj);
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Articles", articles, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Articles", null, {});
  },
};
