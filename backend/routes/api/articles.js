const express = require("express");
const asyncHandler = require("express-async-handler");
const Parser = require('rss-parser');
const axios = require('axios');
const cheerio = require('cheerio');

const { Article, ArticleJoin, Source } = require("../../db/models");

const router = express.Router();

async function getMetaData(url) {
  const res = await axios.get(url);
  const $ = cheerio.load(res.data);
  metaData = {
    'image': [
      'meta[property="og:image"]',
      'meta[name="parsely-image-url"]',
      'meta[name="twitter:image"]',
      'meta[name="twitter:image:src"]'
    ],
    'siteName': [
      'meta[property="og:site_name"]',
      'meta[name="twitter:site"]'
    ],
    'pubDate': [
      'meta[property="article:published_time"]',
      'meta[name="parsely-pub-date"]',
      'meta[name="publish-date"]',
      'meta[name="pub_date"]'
    ],
    'author': [
      'meta[name="author"]'
    ],
    'description': [
      'meta[property="og:description"]'
    ]
  };
  let foundMetaData = {};
  for (const [name, keys] of Object.entries(metaData)) {
    for (const key of keys) {
      content = $(key).attr('content');
      if (content) {
        foundMetaData[name] = content;
        continue;
      }
    }
  }
  console.log(foundMetaData)
  return foundMetaData;
}

// parser set for rss feeds
let parser = new Parser();
async function parseRss(feedUrl) {
	let feed = await parser.parseURL(feedUrl);
	const articles = []
  for (item of feed.items) {
    const metaData = await getMetaData(item.link)
    const entry = {
      title:item.title,
      creator:metaData.creator? metaData.creator : null,
      link:item.link,
      pubDate:metaData.pubDate ? metaData.pubDate : new Date(),
      image:metaData.image ? metaData.image : null,
      websiteName:metaData.siteName ? metaData.siteName : null,
      description:metaData.description ? metaData.description : null,
      content:item.content,
      contentSnippet:item.contentSnippet,
    }
    articles.push(entry)
  }
	return articles
}

// add new articles for user and delete old articles
router.post('/update/user/:userId', asyncHandler(async (req, res) => {
	// find feeds including sources for userId
	const userId = req.params.userId
	const sources = await Source.findAll(
		{
			where: { userId }
		}
	);
	// gets article data for all sources in found feeds
	let articleData = []
	for (let source of sources) {
		const articles = await parseRss(source.url)
		for (let article of articles) {
			article.sourceId = source.id
			article.feedId = source.feedId
			article.userId = source.userId
			articleData.push(article)
		}
	}
	let newArticles = 0
	let deletedArticles = 0
	const dbArticles = await Article.findAll();
	for (let article of dbArticles) {
		if (article.pubDate) {
			// TODO delete old articles that are too old and is not saved by anyone
			// article.destroy()
			// deletedArticles++
		}
	}
	for (let article of articleData) {
		// checks if the article is not in the db
		const articleExists = await Article.findOne(
			{
				where: { url:article.link }
			}
		);
		// TODO checks if the article is recent enough
		// placeholder for date check
		const recentArticle = true

		if (recentArticle && !articleExists && article.title) {
      
			const articleObj = {
				title: article.title ? article.title : "No Title",
				websiteName: article.websiteName,
				pubDate: article.pubDate ? article.pubDate : null,
				content: article.content ? article.content : "No Content",
				image: article.image ? article.image : null,
				contentSnippet: article.contentSnippet ? article.contentSnippet : "No Snippet",
				url: article.link ? article.link : "null",
			}
			const newArticle = await Article.create(articleObj);
			const articleJoinObj = {
				userId: article.userId,
				feedId: article.feedId,
				sourceId: article.sourceId,
				articleId: newArticle.id
			}
			await ArticleJoin.create(articleJoinObj);
			newArticles++
		}
	}
	// sends a response back with info on the new articles found and old articles that where deleted
	result = {
		newArticles,
		deletedArticles
	}
  console.log(result)
	return res.json({result});
  }),
);

// get all articles by userId
router.get('/user/:userId', asyncHandler(async (req, res) => {
	const userId = req.params.userId
	const articles = await ArticleJoin.findAll(
		{
			where: { userId },
			include: Article
		}
	);
	return res.json(articles);
  }),
);

// get all articles by feed
router.get('/feed/:feedId', asyncHandler(async (req, res) => {
	const feedId = req.params.feedId
	const articles = await ArticleJoin.findAll(
		{
			where: { feedId },
			include: Article
		}
	);
	return res.json(articles);
  }),
);

// get all articles by source
router.get('/source/:sourceId', asyncHandler(async (req, res) => {
	const sourceId = req.params.sourceId
	const articles = await ArticleJoin.findAll(
		{
			where: { sourceId },
			include: Article
		}
	);
	return res.json(articles);
  }),
);

module.exports = router;
