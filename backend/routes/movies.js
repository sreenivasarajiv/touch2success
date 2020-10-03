const router = require('express').Router();
const { Movie, validate } = require('../models/movie');
const { Genre } = require('../models/genre');

router.get('/', async (req, res) => {
	const movies = await Movie.find();
	res.send(movies);
});

router.get('/:id', async (req, res) => {
	const movie = await Movie.findOne({ _id: req.params.id });

	if (!movie)
		return res.status(404).send('movie not found');

	res.send(movie);
});

router.post('/', async (req, res) => {
	const { error, value } = validate(req.body);

	if (error)
		return res.status(400).send(error.details[0].message);

	const genre = await Genre.findById(value.genre._id);

	if (!genre)
		return res.status(404).send('genre not found');

	// why not, value.genre = genre;
	// because genre may have 100s of other properties, which embedded documents dont want to have.
	// hybrid approach

	value.genre = {
		_id: genre._id,
		name: genre.name
	};

	// let movie = new Movie(value);
	// movie = await movie.save();

	const movie = new Movie(value);
	await movie.save(); 
	// we didn't reassign movie (like above code)
	// because, movie's _id is set in memory by mongodb driver it self, while we are creating a new movie

	res.send(movie);
});

router.put('/:id', async (req, res) => {
	const { error, value } = validate(req.body, true);

	if (error)
		return res.status(400).send(error.details[0].message);

	if (value.genre) {
		const genre = await Genre.findById(value.genre._id);

		if (!genre)
			return res.status(404).send('genre not found');

		// why not, value.genre = genre;
		// because genre may have 100s of other properties, which embedded documents dont want to have.
		// hybrid approach

		value.genre = {
			_id: genre._id,
			name: genre.name
		};

	}

	const movie = await Movie.findOneAndUpdate({ _id: req.params.id }, value, { new: true });

	if (!movie)
		return res.status(404).send('movie not found');

	res.send(movie);
});

router.delete('/:id', async (req, res) => {
	const movie = await Movie.findByIdAndDelete(req.params.id);

	if (!movie)
		return res.status(404).send('movie not found');

	res.send(movie);
});


module.exports = router;