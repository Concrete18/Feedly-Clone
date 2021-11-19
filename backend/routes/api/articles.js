const express = require("express");
const asyncHandler = require("express-async-handler");

const { Article, Feed, Source } = require("../../db/models");

const router = express.Router();

// Get all articles by userId
router.get('/user/:userId', asyncHandler(async (req, res) => {
	const userId = req.params.userId
	const articles = await Article.findAll(
		{
			where: { userId },
			include: [ {model: models.Source, include: models.Articles }]
		}
	);
	return res.json(articles);
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
