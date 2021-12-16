const express = require("express");
const asyncHandler = require("express-async-handler");
const Parser = require('rss-parser');
const axios = require('axios');
const cheerio = require('cheerio');

const { Article, ArticleJoin, Feed, Source } = require("../../db/models");

const router = express.Router();

function getMetaData(articleUrl) {
  const output = {}
  axios.get(articleUrl)
  .then((res) => {
    const $ = cheerio.load(res.data);
    const metaObj = {};
    $('head').children('meta').each((idx, meta) => {metaObj[meta.attribs.name] = meta.attribs.content})
    for ([key, val] of Object.entries(metaObj)) {
      // author
      if (key.includes('author') || key.includes('creator')) {
        if (!metaObj.creator) output.creator = val;
      }
      // site name
      if (key.includes('og:site_name') || key.includes('site')) {
        if (!metaObj.siteName) output.siteName = val;
      }
      // publish date
      if (key.includes('published_time') || key.includes('pub')) {
        if (!metaObj.pubDate) output.pubDate = val;
      }
      // preview image
      if (key.includes('og:image') || key.includes('image')) {
        if (!metaObj.image) output.image = val;
      }
      // description
      if (key.includes('og:description') || key.includes('creator')) {
        if (!metaObj.description)output.description = val;
      }
    }
    console.log('output', output)
    return output
  })
}

// parser set for rss feeds
let parser = new Parser();
async function parseRss(feedUrl) {
	let feed = await parser.parseURL(feedUrl);
	const articles = []
	feed.items.forEach(item => {
    const metaData = getMetaData(item.link)
    console.log('metaData', metaData)
		const entry = {
			title:item.title,
			creator:metaData.creator? metaData.creator : null,
			link:item.link,
			pubDate:metaData.pubDate,
			image:metaData.image,
			websiteName:metaData.siteName,
      description:metaData.description ? metaData.description : null,
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
