const router = require('express').Router();
const { Rental, validate } = require('../models/rental');
const { Movie } = require('../models/movie');
const { Customer } = require('../models/customer');
const mongoose = require('mongoose');
const Fawn = require('fawn');

Fawn.init(mongoose); // init fawn with mongoose

router.get('/', async (req, res) => {
	const rentals = await Rental.find().sort('-dateOut');
	res.send(rentals);
});

router.get('/:id', async (req, res) => {
	const rental = await Rental.findById(req.params.id);
	if (!rental)
		return res.status(404).send('rental not found');
	res.send(rental);
});

router.post('/', async (req, res) => {
	const { error, value } = validate(req.body);

	if (error)
		return res.status(400).send(error.details[0].message);

	const customer = await Customer.findById(value.customerId);

	if (!customer)
		return res.status(404).send('customer not found');

	const movie = await Movie.findById(value.movieId);

	if (!movie)
		return res.status(404).send('movie not found');

	if (movie.numberInStock === 0)
		return res.status(400).send('movie out of stock');

	let rental = new Rental({
		customer: customer,
		movie: movie
	});

	// even though we set customer to rental.customer 
	// and movie to rental.movie, only given properties,
	// in rental schema are taken and stored from customer and movie
	// along with _id. not all properties of customer & movie are saved in rental

	// here we are doing two operations on mongodb
	// creating rental and updating movie
	// so we need to use transaction (as in tranasaction scope in C#)
	// either both operation succeeds together or both fails together
	// in mongodb, we dont have transactions.
	// but we have a similar concept called 'two phase commit'.


	/*
		rental = await rental.save();
		movie.numberInStock--;
		await movie.save();

		res.send(rental);
	*/

	// we use 'fawn' to achieve it in mongoose. fawn internally uses two phase commit
	// two phase commit is nothing but creating a seperate collection and temporary document
	// updating other documents and then deleting the temporary document

	// so in fawn, we create task object, hookup/chain operations, run it and return result
	// new Fawn.Task()
	// 		.CHANING_COMMANDS('ACTUAL_COLLECTION_NAME', MODEL_INSTANCE) 
	// 		.RUN()

	// learn more about fawn at: https://github.com/e-oj/Fawn

	try {
		new Fawn.Task()
			.save('rentals', rental)
			.update('movies', { _id: movie._id }, {
				$inc: { numberInStock: -1 }
			})
			.run();

		res.send(rental); // { _id, dateOut, customer, movie }

		// we can notice, we didnt set _id and dateOut, and we didnot re-assign rental also
		// i.e., rental = new Fawn.Task() or something like that
		// but rental object has _id, movie._id, customer._id and dateOut
		// dateOut, movie._id, customer._id were set by mongoose, by referring to the rental schema we defined
		// whereas _id, is not set by either mongoose nor mongodb, it is actually set by mongodb.driver
		// we will see it later detailed
		// thus all values are set in rental object (in memory) and we return it as response

	} catch (ex) {
		res.status(500).send('something went wrong');
	}

});

router.put('/:id', async (req, res) => {

	const rental = await Rental.findById(req.params.id);

	if (!rental)
		return res.status(404).send('rental not found');

	if (rental.dateReturned)
		return res.status(400).send('already returned');


	// here we are doing two operations on mongodb
	// creating rental and updating movie
	// so we need to use transaction (as in tranasaction scope in C#)
	// either both operation succeeds together or both fails together
	// in mongodb, we dont have transactions.
	// but we have a similar concept called 'two phase commit'.

	/*

		rental.dateReturned = Date.now();
		rental.rentalFee = rental.movie.dailyRentalRate * (rental.customer.isGold ? 0.5 : 1);
		rental = await rental.save();

		const movie = await Movie.findById(rental.movie._id);
		movie.numberInStock++;
		await movie.save();

		res.send(rental);

	*/

	try {

		const rentalFactor = rental.customer.isGold ? 0.5 : 1;

		await new Fawn.Task()
			.update('rentals', { _id: rental._id }, {
				$currentDate: {
					dateReturned: true
				},
				$mul: {
					rentalFee: rentalFactor
				}
			})
			.update('movies', { _id: rental.movie._id }, {
				$inc: {
					numberInStock: 1
				}
			})
			.run({ useMongoose: true })
			.then(results => res.send(results))

	} catch (ex) {
		console.log(ex);
		res.status(500).send('something went wrong');
	}

});

router.delete('/:id', async (req, res) => {
	const rental = await Rental.findOneAndDelete(req.params.id);
	if (!rental)
		return res.status(404).send('rental not found');
	res.send(rental);
})

module.exports = router;