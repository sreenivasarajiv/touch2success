const mongoose = require('mongoose');
const Joi = require('joi');

const Customer = mongoose.model('Customer', new mongoose.Schema({
	name: {
		type: String,
		required: true,
		minlength: 5,
		maxlength: 255
	},
	isGold: {
		type: Boolean,
		default: false
	},
	phone: {
		type: String,
		minlength: 10,
		default: ''
	}
}));

function validateCustomer(customer) {
	const schema = {
		name: Joi.string().required().min(5).max(255),
		isGold: Joi.bool(),
		phone: Joi.string().min(10).required().max(25)
	}
	return Joi.validate(customer, schema);
}

exports.Customer = Customer;
exports.validate = validateCustomer;