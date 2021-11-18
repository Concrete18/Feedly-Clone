const express = require("express");
const asyncHandler = require("express-async-handler");

const { Feed, Source } = require("../../db/models");

const router = express.Router();

// Get all feeds
router.get('/user/:userId', asyncHandler(async (req, res) => {
	const userId = req.params.userId
	const feeds = await Feed.findAll(
		{
			where: { ownerId: userId },
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

module.exports = router;
