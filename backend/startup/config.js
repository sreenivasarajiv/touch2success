const config = require('config');

module.exports = function () {
    if (!config.get('jwtPrivateKey')) {
        // jwtPrivateKey is not set in env
        throw new Error('FATAL ERROR: jwtPrivateKey is not defined');
    }
}