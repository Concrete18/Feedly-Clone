const express = require("express");
const { check } = require("express-validator");
const asyncHandler = require("express-async-handler");

const { User,  Feed, Source, sequelize } = require("../../db/models");

const router = express.Router();

// Get feeds with sources included
router.get('/:id/all', asyncHandler(async (req, res) => {
	const userId = req.params.id

	const feeds = await Feed.findAll(
		{
			where: { ownerId: userId },
			include: Source
		}
	);

	return res.json(feeds);
  }),
);

module.exports = router;
