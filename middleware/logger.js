const moment = require('moment'); 

// Logger middleware for logging, where you have the access to teh request and response of the middleware
const logger = (req, res, next) => {
    console.log(`${req.protocol}://${req.get('host')}${req.originalUrl}: ${moment().format()}`);
    next();
}

module.exports = logger;