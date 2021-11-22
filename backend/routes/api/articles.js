const express = require("express");
const asyncHandler = require("express-async-handler");
const Parser = require('rss-parser');

const { Article, Feed, Source } = require("../../db/models");

const router = express.Router();

// parser set for rss feeds
let parser = new Parser();

async function parseRss(feedUrl) {
	let feed = await parser.parseURL(feedUrl);
	const articles = []
	feed.items.forEach(item => {
		const entry = {
			title:item.title,
			creator:item.creator,
			link:item.link,
			pubDate:item.pubDate,
			content:item.content,
			contentSnippet:item.contentSnippet,
		}
		articles.push(entry)
	});
	return articles
}

// add new articles for user and delete old articles
router.post('/update/user/:userId', asyncHandler(async (req, res) => {
	// find feeds including sources for userId
	const userId = req.params.userId
	const feeds = await Feed.findAll(
		{
			where: { userId },
			include: Source
		}
	);
	// gets article data for all sources in found feeds
	let articleData = []
	for (let feed of feeds) {
		// get articles from each source
		for (let source of feed.Sources) {
		  const articles = await parseRss(source.url)
		  articles.sourceId = source.id
		  articleData.push(...articles)
		}
	}
	let newArticles = 0
	let deletedArticles = 0
	const dbArticles = await Article.findAll();
	for (let article of dbArticles) {
		// TODO delete old articles that are too old
		// article.destroy()
		deletedArticles++
	}
	for (let article of articleData) {
		// checks if the article is not in the db
		const articleExists = await Article.findOne(
			{
				where: { url:article.link }
			}
		);
		// TODO checks if the article is recent enough

		if (true && !articleExists && article.title) {
			const articleObj = {
				sourceId: article.sourceId ? article.sourceId : 1,
				title: article.title ? article.title : "null",
				creator: article.creator ? article.creator : "null",
				// pubDate: article.pubDate ? article.pubDate : null,
				pubDate: article.pubDate ? article.isoDate : null,
				content: article.content ? article.content : "null",
				contentSnippet: article.contentSnippet ? article.contentSnippet : "null",
				url: article.link ? article.link : "null",
			}
			await Article.create(articleObj);
			newArticles++
		}
	}
	// sends a response back with info on the new articles found and old articles that where deleted
	result = {
		newArticles,
		deletedArticles
	}
	return res.json({result});
  }),
);

// get all articles
router.get('/all', asyncHandler(async (req, res) => {
	const feeds = await Feed.findAll(
		{
			where: { feedId },
			include: Source
			// include articles
		}
	);
	let sources = []
	for (let feed of feeds) {
		for (let source of feed.Source) {
			sources.push(source)
		}
	}
	return res.json(sources);
  }),
);

// get all articles by feed
router.get('/feed/:feedId', asyncHandler(async (req, res) => {
	const feedId = req.params.feedId
	const feeds = await Feed.findOne(
		{
			where: { feedId },
			include: Source
		}
	);
	return res.json(feeds);
  }),
);

// get all articles by source
router.get('/feed/:feedId', asyncHandler(async (req, res) => {
	const feedId = req.params.feedId
	const feeds = await Feed.findOne(
		{
			where: { feedId },
			include: Source
		}
	);
	return res.json(feeds);
  }),
);

module.exports = router;
