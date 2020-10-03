const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
	res.render('index', { title: 'Vidly - An Video Store Application', message: 'Welcome to Vidly' });
});

module.exports = router;