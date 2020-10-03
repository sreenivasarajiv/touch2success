const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const config = require('config');

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		minlength: 4,
		maxlength: 255,
		trim: true
	},
	email: {
		type: String,
		unique: true,
		minlength: 5,
		maxlength: 255,
		trim: true,
		required: true
	},
	password: {
		type: String,
		required: true,
		maxlength: 1024
	},
	isAdmin: Boolean
});

userSchema.methods.generateAuthToken = function () {

	// based on Information Expert Priniciple of OOP
	// i.e, all the informations required to generate authentication token is with user only
	// like a chef decides what to cook instead of waiter, a tech lead decides what to build instead of developer or tester or designer,
	// user has all info to create auth token (like _id, permission etc..) and he holds the ultimate responsibility

	// how can we get _id ? permission ? etc..?

	// in arrow function doesnot have own 'this'. it inherits 'this' of calling class
	// in this case, the router handlers calls generateAuthToken();

	// so we are using normal 'function' (look above), in which 'this' refers to the parent object
	// which is a user object. from user object, we can get _id, permission etc..,

	const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, config.get('jwtPrivateKey'));
	return token;

}

const User = mongoose.model('User', userSchema);

module.exports.User = User;
module.exports.validate = function (user) {
	const schema = Joi.object({
		name: Joi.string().required().min(5).max(255),
		email: Joi.string().email().required().min(5).max(255),
		password: Joi.string().required().min(5).max(255)
	});

	// we can enforce password validation using, an npm package called,
	// https://www.npmjs.com/package/joi-password-complexity
	// optional we can do it on frontend side

	return Joi.validate(user, schema);
}