const express = require("express");
const { check } = require("express-validator");
const asyncHandler = require("express-async-handler");

const { Source } = require("../../db/models");

const router = express.Router();

// Get all sources by userId
router.get('/user/:userId', asyncHandler(async (req, res) => {
	console.log('yay')
	const sources = await Source.findAll(
		{
			where: { userId: req.params.userId }
		}
	);
	return res.json(sources);
  }),
);

// Get by sources by feedId
router.get('/feed/:feedId', asyncHandler(async (req, res) => {
	const sources = await Source.findAll(
		{
			where: { feedId: req.params.feedId }
		}
	);
	return res.json(sources);
  }),
);

// create new source
router.post('/new', asyncHandler(async function(req, res) {
	const { name, url, userId } = req.body
	newSource = await Source.create({ name, url, userId });
  return res.json(newSource);
}));

// update source name by sourceId
router.put('/update/:id', asyncHandler(async function(req, res) {
	const { name } = req.body
	const source = await Source.findByPk(req.params.id);
	await source.update({ name });
	return res.json(source);
}));

// delete source name by sourceId
router.delete('/delete/:id', asyncHandler(async function(req, res) {
	const source = await Source.findByPk(req.params.id);
	source.destroy()
	return res.json(source);
}));

module.exports = router;
