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
		  articleData.push(articles)
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
		// TODO checks if the article is not in the db and recent enough and adds it to the database if it is.
		console.log(article)
		if (true && article.title) {
			articleObj = {
				sourceId: article.sourceId,
				title: article.title,
				creator: article.creator,
				pubDate: article.pubDate,
				content: article.content,
				contentSnippet: article.contentSnippet,
				url: article.url,
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
	console.log(result)
	return res.json({result});
  }),
);

// Get by sources by feed
router.get('/:feedId', asyncHandler(async (req, res) => {
	const feedId = req.params.feedId
	const feeds = await Feed.findAll(
		{
			where: { feedId },
			include: Source
		}
	);
	return res.json(feeds);
  }),
);

router.post('/new', asyncHandler(async function(req, res) {
	newArticle = await Article.create(req.body);
  return res.json(newArticle);
}));

// router.put('/update/:id', asyncHandler(async function(req, res) {
// 	const { userId, feedName } = req.body
// 	console.log(req.body)
// 	const feed = await Feed.findByPk(req.params.id);
// 	console.log(feed)
// 	await feed.update({ userId, feedName });
// 	return res.json(feed);
// }));

router.delete('/delete/:id', asyncHandler(async function(req, res) {
	const articleId = req.params.id
	const article = await Feed.findByPk(articleId);
	article.destroy()
	return res.json(article);
}));

module.exports = router;
