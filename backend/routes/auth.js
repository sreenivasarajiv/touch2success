const router = require('express').Router();
const { User } = require('../models/user');
const bcryptjs = require('bcryptjs');
const Joi = require('joi');

/*
	note: logging out feature is not implemented on server. since we are not saving the token anywhere in server.
	to logout a user simply delete the token on client side. (front end application will take care of it)
	it is not recommened to store the auth-token in db. because if a hacker has access to that db,
	he can send request to api in befaulf of the user. (where he can do transactions, edit data etc..)
	if we want to store the access token in db, hash it like password and store it.

	a token is like a passport/driver's license with which he can do whatever he want with fake identity (of user)
	(like drive a car, go to foriegn nation and commit crime, transfer money in hawala) etc.. the user will get 
	accused of whatever the hacker's action maybe. he dont even want to do have password of the user to send request.

	also a secure connection (https) is needed between the client and the server. because in unsecure,
	un encrypted connection, a hacker in the middle, can read and parse http request and can gain access
	to the access-token, with which he can do whatever he wants

*/

router.post('/', async (req, res) => {
	const { error, value } = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	const user = await User.findOne({ email: value.email });
	if (!user) return res.status(400).send('invalid email or password');

	const isValidPassword = await bcryptjs.compare(value.password, user.password);
	if(!isValidPassword) return res.status(400).send('invalid email or password');

	const token = user.generateAuthToken();
	res.send(token);

});

function validate (req) {
	const schema = Joi.object({
		email: Joi.string().email().required().min(5).max(255),
		password: Joi.string().required().min(5).max(255)
	});
	return Joi.validate(req, schema);
}

module.exports = router;
