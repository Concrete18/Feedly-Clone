const express = require("express");
const { check } = require("express-validator");
const asyncHandler = require("express-async-handler");

const { Feed, Source } = require("../../db/models");

const router = express.Router();

// Get source
router.get('/:id/all', asyncHandler(async (req, res) => {
	const userId = req.params.id
	console.log(userId)

	const sources = await Feed.findAll(
		{
			where: { owner_id: userId },
			include: Source
		}
	);

	console.log(sources)

	const RSS_URL = `https://codepen.io/picks/feed/`;

	fetch(RSS_URL)
		.then(response => response.text())
		.then(str => new window.DOMParser().parseFromString(str, "text/xml"))
		.then(data => console.log(data))
	
	const { title, body } = req.body;

	return res.json({
			title,
			body,
		});
  }),
);

module.exports = router;
