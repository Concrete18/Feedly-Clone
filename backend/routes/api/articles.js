const express = require("express");
const asyncHandler = require("express-async-handler");
const Parser = require('rss-parser');

// const metascraper = require('metascraper')([
// 	// require('metascraper-author')(),
// 	// require('metascraper-date')(),
// 	require('metascraper-image')(),
// 	// require('metascraper-logo')(),
// ])

// const got = require('got')

const { Article, ArticleJoin, Feed, Source } = require("../../db/models");

const router = express.Router();

// parser set for rss feeds
let parser = new Parser();

function getImages(string) {
  const imgRex = /<img.*?src="(.*?)"[^>]+>/g;
  const images = [];
    let img;
    while ((img = imgRex.exec(string))) {
			if (img[1].includes('jpg' || '.png'))
     	images.push(img[1]);
    }
	if (images) return images[0];
	else return null;
}

function titleCase(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

async function parseRss(feedUrl) {
	let feed = await parser.parseURL(feedUrl);
	const articles = []
	feed.items.forEach(item => {
		const setImage = getImages(item.content)
		const websiteName = (new URL(item.link)).hostname.split('.')[1]
		console.log(titleCase(websiteName))
		const entry = {
			title:item.title,
			creator:item.creator,
			link:item.link,
			pubDate:item.pubDate,
			image:setImage,
			websiteName:titleCase(websiteName),
			content:item.content,
			contentSnippet:item.contentSnippet,
		}
		articles.push(entry)
	});
	return articles
}

// async function parseMetadata(articleUrl) {
// 	;(async () => {
// 		const { body: html, url } = await got(articleUrl)
// 		const metadata = await metascraper({ html, url })
// 		console.log(metadata)
// 	})()
// }

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
		if (article.createdAt) {
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
	const feeds = await Feed.findOne(
		{
			where: { feedId },
			include: Source,
			limit: 20
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
