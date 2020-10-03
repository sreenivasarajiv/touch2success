const express = require('express');
const router = express.Router();
const { Genre, validate } = require('../models/genre');
const auth = require('../middlewares/auth');
const admin = require('../middlewares/admin');

// READ

router.get('/', async (req, res, next) => {
	throw new Error('couldn\'t get genres.')
	const genres = await Genre.find().sort({ name: 1 });
	res.json(genres);
});

// CREATE

router.post('/', auth, async (req, res) => {

	const { value, error } = validate(req.body);

	if (error)
		return res.status(400).send(error.details[0].message);

	let genre = new Genre({ name: value.name });
	genre = await genre.save();
	res.json(genre);
});

// READ

router.get('/:id', async (req, res) => {
	// const genre = genres.find(g => g.id === parseInt(req.params.id));
	const genre = await Genre.findOne({ _id: req.params.id });
	genre ? res.json(genre) : res.status(404).send('genre not found')
});

// UPDATE

router.put('/:id', async (req, res) => {

	const { value, error } = validate(req.body);
	if (error)
		return res.status(400).send(error.details[0].message);

	// const genre = genres.find(g => g.id === parseInt(req.params.id));
	const genre = await Genre.findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true });
	if (!genre)
		return res.status(404).send('genre not found');

	res.json(genre);

});

// DELETE

router.delete('/:id', [auth, admin], async (req, res) => {

	//const genre = genres.find(g => g.id === parseInt(req.params.id));

	// genre ? genres.splice(genres.indexOf(genre), 1) && res.json(genre)
	// 	: res.status(404).send('genre not found')

	let genre = await Genre.findByIdAndDelete(req.params.id);
	if (!genre)
		return res.status(404).send('genre not found');

	res.json(genre);

});

module.exports = router;