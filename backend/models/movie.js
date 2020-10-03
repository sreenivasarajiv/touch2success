const mongoose = require('mongoose');
const genreSchema = require('../models/genre').Schema;
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const Movie = mongoose.model('Movie', new mongoose.Schema({
	title: {
		type: String,
		required: true,
		minlength: 5,
		trim: true,
		maxlength: 255
	},
	genre: {
		type: genreSchema,
		required: true
	},
	numberInStock: {
		type: Number,
		default: 0,
		min: 0,
		max: 255
	},
	dailyRentalRate: {
		type: Number,
		default: 0,
		min: 0,
		max: 255
	}
}));

/*

// my solution - correct only but complex

function validateMovie(movie, update = false) {

	const genreSchema = {
		_id: Joi.objectId().required(),
		name: Joi.string().required().min(3)
	}

	const schema = Joi.object({
		title: Joi.when('$update', {
			is: Joi.string().min(5).max(255).valid(true).trim(),
			then: Joi.string().min(5).max(255).optional().trim(),
			otherwise: Joi.string().min(5).max(255).required().trim()
		}),
		genre: Joi.when('$update', {
			is: Joi.object().keys(genreSchema).valid(true),
			then: Joi.object().keys(genreSchema).optional(),
			otherwise: Joi.object().keys(genreSchema).required()
		}),
		numberInStock: Joi.number().min(0).max(255),
		dailyRentalRate: Joi.number().min(0).max(255)
	});
	return Joi.validate(movie, schema, { context: { update: update } });
}

*/ 

// since joi schema and model schema are independent of each other
// joi schema is simple and takes genreId as property (comes from user)
// whereas model schema has genre as property

function validateMovie(movie){
	const schema = {
		title: Joi.string().required().min(5).max(255),
		genreId: Joi.objectId().required(), // objectId() is obtained from another library. see above
		numberInStock: Joi.number().min(0).max(255),
		dailyRentalRate: Joi.number().min(0).max(255)
	}
	return Joi.validate(movie, schema);
}

exports.Movie = Movie;
exports.validate = validateMovie;