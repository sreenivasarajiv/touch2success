const mongoose = require('mongoose');
const Joi = require('joi');

// when we create a new rental, in rental schema, we need a customer, a movie, 
// here we followed hybrid approach (embedding only neccessary properties while creating a rental)
// like snapshot of informations while creting a new rental
// and followed query first when you insert  (mongodb principle)

// in customer schema we might have 1000's of other properties, but we only need _id, name, isGold (for discount
// calculation at date of return) and phone number to contact him in future

// so we created seperate schema for customer within rental schema
// same is true for movie also. we only need its id, name & stock in number (whether it is available or not)
// and daily rental rate (so we can calculate amount that he should be paying at date of return)

// dateOut is created automatically when we create new rental
// dateReturned will be created automatically when we update the rental
// rentalFee will be calcualted from dailyRental rate & discount (if available) and inserted when we return

// checkout joi's validation schema it is different from rental schema

const Rental = mongoose.model('Rental', new mongoose.Schema({
	// rental_id will be automatically generated by mongo driver while creating new rental
	customer: {
		type: new mongoose.Schema({
			// customer_id of given customer will be inserted while creating a new rental
			name: {
				type: String,
				required: true,
				minlength: 5,
				maxlength: 255,
				trim: true
			},
			isGold: {
				type: Boolean,
				required: true,
			},
			phone: {
				type: String,
				minlength: 10,
				required: true,
				maxlength: 255,
				trim: true
			}
		}),
		required: true
	},
	movie: {
		type: new mongoose.Schema({
			// movie_id of given movie will be inserted while creating a new rental
			title: {
				type: String,
				required: true,
				minlength: 5,
				maxlength: 255,
				trim: true
			},
			dailyRentalRate: {
				type: Number,
				min: 0,
				max: 255,
				required: true,
			}
		}),
		required: true
	},
	dateOut: {
		type: Date,
		default: Date.now(),
		required: true
	},
	dateReturned: {
		type: Date
	},
	rentalFee: {
		type: Number,
		min: 0
	}
}));

module.exports.validate = function (rental) {
	const schema = Joi.object({
		customerId: Joi.objectId().required(),
		movieId: Joi.objectId().required()
	});
	return Joi.validate(rental, schema);
}

module.exports.Rental = Rental;