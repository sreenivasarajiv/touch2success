const express = require('express');
const app = express();
const winston = require('winston');

const port = process.env.PORT || 3000;

require('./startup/exception-handler')();
require('./startup/config')();
require('./startup/database')();
require('./startup/routes')(app);

app.listen(port, () => winston.info(`Listening to port: ${port}`));