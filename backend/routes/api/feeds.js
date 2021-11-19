const express = require("express");
const asyncHandler = require("express-async-handler");

const { Feed, Source } = require("../../db/models");

const router = express.Router();

// Get all feeds
router.get('/user/:userId', asyncHandler(async (req, res) => {
	const userId = req.params.userId
	const feeds = await Feed.findAll(
		{
			where: { userId: userId },
			include: Source
		}
	);
	return res.json(feeds);
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
	newFeed = await Feed.create(req.body);
  return res.json(newFeed);
}));

router.put('/update/:id', asyncHandler(async function(req, res) {
	const { userId, feedName } = req.body
	console.log(req.body)
	const feed = await Feed.findByPk(req.params.id);
	console.log(feed)
	await feed.update({ userId, feedName });
	return res.json(feed);
}));

router.delete('/delete/:id', asyncHandler(async function(req, res) {
	const feedId = req.params.id
	const feed = await Feed.findByPk(feedId);
	feed.destroy()
	return res.json(feed);
}));

module.exports = router;
