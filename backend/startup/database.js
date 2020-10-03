const mongoose = require('mongoose');
const winston = require('winston');

module.exports = function () {
    mongoose.connect('mongodb://localhost/vidly', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
        .then(() => winston.info('connected to mongodb ...'))
        // .catch(err => console.error('couldn\'t connect to mongodb: ', err));

        // we are commenting out catch block because,
        // we donot need a express instance that couldn't connect to database

        // if mongodb couldn't connect, it throws unhandledPromise rejection error
        // and we are terminating the app in the error handler.

}