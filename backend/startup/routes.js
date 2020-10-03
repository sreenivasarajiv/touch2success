const express = require('express');
require('express-async-errors');

const error = require('../middlewares/error');
const logger = require('../middlewares/logger');

const customers = require('../routes/customers');
const genres = require('../routes/genres');
const movies = require('../routes/movies');
const home = require('../routes/home');
const rentals = require('../routes/rentals');
const users = require('../routes/users');
const auth = require('../routes/auth');

module.exports = function (app) {

    app.use(express.json()); 
    app.use(logger);

    app.set('view engine', 'pug');
    app.set('views', './views');

    app.use('/api/genres', genres);
    app.use('/api/customers', customers);
    app.use('/api/movies', movies);
    app.use('/api/rentals', rentals);
    app.use('/api/users', users);
    app.use('/api/auth', auth);
    app.use('/', home);

    // handling global errors
    app.use(error);

}