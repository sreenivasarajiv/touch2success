const _ = require('lodash');
const router = require('express').Router();
const { User, validate } = require('../models/user');
const bcryptjs = require('bcryptjs');
const auth = require('../middlewares/auth');

// to get current user info, 
// instead of using router.get('/:id') - is insecure, because we can get whatever user's info if we want 
// by an api request from client side, by passing an id

router.get('/me', auth, async (req, res) => {

	// we get user._id from auth middleware

	const user = await User.findById(req.user._id).select('-password -__v'); // excluding password property & __v (version) property
	res.send(user);

});

router.post('/', async (req, res) => {
	const { error, value } = validate(req.body);

	if (error) return res.status(400).send(error.details[0].message);

	let user = await User.findOne({ email: value.email });

	if (user) return res.status(400).send('user already registered');

	// below approach is completely valid. 
	// saving only selective propreties and retreive only selective properties (except password)
	// because a malicious user may send 1000 properties, which results in crash of app
	// but the industry standard is using lodash

	/*
		user = new User({
			name: value.name,
			password: value.password,
			email: value.email
		});

		await user.save();
		res.send(user);
	*/

	user = new User(_.pick(value, ['name', 'password', 'email']));
	const salt = await bcryptjs.genSalt(10);
	user.password = await bcryptjs.hash(user.password, salt);

	await user.save();
	const token = user.generateAuthToken();

	res.header('x-auth-token', token).send(_.pick(user, ['_id', 'name', 'email']));

});

module.exports = router;
