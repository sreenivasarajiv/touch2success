import * as express from 'express';
require('express-async-errors');
import * as authRoutes from '../routes/auth.route';
import * as stateRoutes from '../routes/state.route';
import * as storeRoutes from '../routes/store.route';
import * as customerRoutes from '../routes/customer.route';

import { logger } from '../middlewares/logger'
import { handleError } from '../middlewares/error'

export function route(app: express.Express) {

    app.use(express.json());
    app.use(logger);

    app.use('/auth', authRoutes);
    app.use('/state', stateRoutes);
    app.use('/store', storeRoutes);
    app.use('/customer', customerRoutes);
    app.use('/', express.static('public'));

    // handling global errors
    app.use(handleError);

}