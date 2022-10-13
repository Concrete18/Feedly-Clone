const express = require("express");
const asyncHandler = require("express-async-handler");
const Parser = require("rss-parser");
const axios = require("axios");
const cheerio = require("cheerio");

const { Article, ArticleJoin, Source } = require("../../db/models");

const router = express.Router();

async function getMetaData(url) {
  const res = await axios.get(url).catch(function (error) {
    if (error.response) {
      // Request made and server responded
      // console.log(error.response.data);
      console.log(url, error.response.status);
      // console.log(error.response.headers);
    } else if ((url, error.request)) {
      // The request was made but no response was received
      console.log(url, error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log(url, "Error", error.message);
    }
  });
  if (!res) return false;
  const $ = cheerio.load(res.data);
  metaData = {
    image: [
      'meta[property="og:image"]',
      'meta[name="parsely-image-url"]',
      'meta[name="twitter:image"]',
      'meta[name="twitter:image:src"]',
    ],
    siteName: ['meta[property="og:site_name"]', 'meta[name="twitter:site"]'],
    pubDate: [
      'meta[property="article:modified_time"]',
      'meta[property="article:published_time"]',
      'meta[name="parsely-pub-date"]',
      'meta[name="publish-date"]',
      'meta[name="pub_date"]',
    ],
    creator: ['meta[name="author"]'],
    description: ['meta[property="og:description"]'],
  };
  let foundMetaData = {};
  for (const [name, keys] of Object.entries(metaData)) {
    for (const key of keys) {
      content = $(key).attr("content");
      if (content) {
        foundMetaData[name] = content;
        continue;
      }
    }
  }
  return foundMetaData;
}

// parser set for rss feeds
let parser = new Parser();
async function parseRss(feedUrl) {
  let feed = await parser.parseURL(feedUrl);
  const articles = [];
  for (item of feed.items) {
    const entry = {
      title: item.title,
      link: item.link,
      content: item.content,
      contentSnippet: item.contentSnippet,
    };
    articles.push(entry);
  }
  return articles;
}

router.post(
  "/clean",
  asyncHandler(async (req, res) => {
    const dbArticles = await Article.findAll();
    for (let article of dbArticles) {
      const oneMonthAgo = new Date(
        new Date().getFullYear(),
        new Date().getMonth() - 1,
        new Date().getDate()
      );
      // deletes articles if they are over a month old
      if (article.pubDate < oneMonthAgo) {
        // TODO delete old articles that are too old and is not saved by anyone
        console.log(article.title, article.pubDate, "was deleted");
        article.destroy();
        deletedArticles++;
      }
    }
  })
);

// add new articles for user and delete old articles
router.post(
  "/update/user/:userId/:max_articles",
  asyncHandler(async (req, res) => {
    const start = Date.now(); // TODO delete this

    // find feeds including sources for userId
    const userId = req.params.userId;
    const max = req.params.max_articles;
    console.log("\n\nStarting Article Update with", max, "articles");
    const sources = await Source.findAll({
      where: { userId },
    });
    // gets article data for all sources in found feeds
    let articleData = [];
    for (let source of sources) {
      const articles = await parseRss(source.url);
      for (let article of articles) {
        article.sourceId = source.id;
        article.feedId = source.feedId;
        article.userId = source.userId;
        articleData.push(article);
      }
    }
    // creates new articles in database
    let newArticles = 0;
    for (let article of articleData) {
      // checks if the article is not in the db
      if (newArticles >= max) {
        console.log("\nEarly Exit");
        break;
      }
      const articleExists = await Article.findOne({
        where: { url: article.link },
      });
      // TODO make sure article joins are created even if the article exists
      if (!articleExists && article.link) {
        const metaData = await getMetaData(article.link);
        if (!metaData) continue;
        // creates article entry
        const articleObj = {
          // base article info
          title: article.title,
          url: article.link,
          content: article.content ? article.content : "No Content",
          contentSnippet: article.contentSnippet
            ? article.contentSnippet
            : "No Snippet",
          // scraped meta data
          websiteName: metaData.siteName ? metaData.siteName : null,
          pubDate: metaData.pubDate ? metaData.pubDate : null,
          image: metaData.image ? metaData.image : null,
          creator: metaData.creator ? metaData.creator : null,
        };
        const newArticle = await Article.create(articleObj);
        // creates articleJoin entry
        const articleJoinObj = {
          userId: article.userId,
          feedId: article.feedId,
          sourceId: article.sourceId,
          pubDate: metaData.pubDate,
          articleId: newArticle.id,
        };
        await ArticleJoin.create(articleJoinObj);
        newArticles++;
      }
    }
    console.log(`\n\nAdded ${newArticles} new articles`);
    // sends a response back with info on the new articles found and old articles that where deleted
    console.log("\n\nFinished Article Update");

    const end = Date.now(); // TODO delete this

    console.log(`Execution time: ${(end - start) / 1000} seconds\n`);
    return res.json(newArticles);
  })
);

// get all articles by userId
router.get(
  "/user/:userId",
  asyncHandler(async (req, res) => {
    const userId = req.params.userId;
    const articles = await ArticleJoin.findAll({
      where: {
        userId,
        read: false,
      },
      limit: 30,
      include: Article,
    });
    return res.json(articles);
  })
);

// get all articles by feed
router.get(
  "/feed/:feedId",
  asyncHandler(async (req, res) => {
    const feedId = req.params.feedId;
    const articles = await ArticleJoin.findAll({
      where: {
        feedId,
        read: false,
      },
      include: Article,
    });
    return res.json(articles);
  })
);

// get all articles by source
router.get(
  "/source/:sourceId",
  asyncHandler(async (req, res) => {
    const sourceId = req.params.sourceId;
    const articles = await ArticleJoin.findAll({
      where: {
        sourceId,
        read: false,
      },
      include: Article,
    });
    return res.json(articles);
  })
);

// get all saved articles for user
router.get(
  "/saved/user/:userId",
  asyncHandler(async (req, res) => {
    const userId = req.params.userId;
    const articles = await ArticleJoin.findAll({
      where: {
        userId,
        saved: true,
      },
      include: Article,
    });
    return res.json(articles);
  })
);

// mark article as read
router.put(
  "/:articleId/user/:userId/read",
  asyncHandler(async function (req, res) {
    const articleId = req.params.articleId;
    const userId = req.params.userId;
    const articleJoin = await ArticleJoin.findOne({
      where: { articleId, userId },
      include: Article,
    });
    await articleJoin.update({ read: true });
    return res.json(articleJoin);
  })
);

// mark article as unread
router.put(
  "/:articleId/user/:userId/unread",
  asyncHandler(async function (req, res) {
    const articleId = req.params.articleId;
    const userId = req.params.userId;
    const articleJoin = await ArticleJoin.findOne({
      where: { articleId, userId },
      include: Article,
    });
    await articleJoin.update({ read: false });
    return res.json(articleJoin);
  })
);

// save article
router.put(
  "/:articleId/user/:userId/save",
  asyncHandler(async function (req, res) {
    const articleId = req.params.articleId;
    const userId = req.params.userId;
    const articleJoin = await ArticleJoin.findOne({
      where: { articleId, userId },
      include: Article,
    });
    await articleJoin.update({
      saved: true,
      savedAt: new Date(),
    });
    return res.json(articleJoin);
  })
);

// remove article from saved
router.put(
  "/:articleId/user/:userId/unsave",
  asyncHandler(async function (req, res) {
    const articleId = req.params.articleId;
    const userId = req.params.userId;
    const articleJoin = await ArticleJoin.findOne({
      where: { articleId, userId },
      include: Article,
    });
    await articleJoin.update({
      saved: false,
      savedAt: null,
    });
    return res.json(articleJoin);
  })
);

module.exports = router;
