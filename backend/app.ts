import * as express from 'express';
const app = express();
import * as winston from 'winston';

const port = process.env.PORT || 3000;

import { exceptionHandler } from './startup/exception-handler';
import { route } from './startup/routes';
import { establishDbConnectionPool } from './startup/database';
// import './startup/config'();
// require('./startup/database')();
exceptionHandler();
establishDbConnectionPool().then(() => {
    route(app);
});
app.listen(port, () => winston.info(`Listening to port: ${port}`));