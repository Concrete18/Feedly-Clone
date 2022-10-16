"use strict";

const seedData = [
  // gaming
  {
    userId: 1,
    feedId: 1,
    sourceId: 1,
    articleId: 1,
  },
  {
    userId: 1,
    feedId: 1,
    sourceId: 1,
    articleId: 2,
  },
  {
    userId: 1,
    feedId: 3,
    sourceId: 1,
    articleId: 3,
  },
];

let articleJoins = [];
for (const entry of seedData) {
  const articleJoin_obj = {
    userId: entry.userId,
    feedId: entry.feedId,
    sourceId: entry.sourceId,
    articleId: entry.articleId,

    read: true,
    saved: true,
    savedAt: "2021-06-12T21:37:15+00:00",
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  articleJoins.push(articleJoin_obj);
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("ArticleJoins", articleJoins, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("ArticleJoins", null, {});
  },
};
