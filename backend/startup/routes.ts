import * as express from 'express';
require('express-async-errors');
import * as stateRoutes from '../routes/state.route';

import { logger } from '../middlewares/logger'
import { handleError } from '../middlewares/error'

// const customers = require('../routes/customers');
// const genres = require('../routes/genres');
// const movies = require('../routes/movies');
// const rentals = require('../routes/rentals');
// const users = require('../routes/users');
// const auth = require('../routes/auth');

export function route(app: express.Express) {

    app.use(express.json());
    app.use(logger);

    // app.use('/api/genres', genres);
    // app.use('/api/customers', customers);
    // app.use('/api/movies', movies);
    // app.use('/api/rentals', rentals);
    // app.use('/api/users', users);
    // app.use('/api/auth', auth);
    app.use('/state', stateRoutes);
    app.use('/', express.static('public'));

    // handling global errors
    app.use(handleError);

}