const mongoose = require('mongoose');
const config = require('./env/env');
const logger = config.logger;

mongoose.Promise = global.Promise;

const options = {
    useMongoClient: true,
    autoIndex: false, // Don't build indexes
    reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
    reconnectInterval: 1000, // Reconnect every 500ms
    poolSize: 10, // Maintain up to 10 socket connections
    bufferMaxEntries: 0
};
const reconnectTimeout = 5000; // ms.

//
// Connect function; enables reconnecting when connection to database was lost.
// https://stackoverflow.com/questions/16226472/mongoose-autoreconnect-option
//
function connect() {
    logger.info('Connecting to Mongo on ' + config.dburl);
    mongoose.connect(config.dburl, options)
        .catch(() => { /* No error or warning; the db.on events will handle these. */ });
}

const db = mongoose.connection;

db.on('error', (error) => {
    logger.error(error.toString());
    mongoose.disconnect();
});
db.on('connected', () => {
    logger.info('Connected to Mongo on ' + config.dburl);
});
db.on('reconnected', () => {
    logger.info('Reconnected to Mongo on ' + config.dburl);
});
db.on('disconnected', () => {
    logger.info('Unable to connect to Mongo, reconnecting...');
    setTimeout(() => connect(), reconnectTimeout);
});

setTimeout(() => {
    // Wait until the server has started listening
    // only to prettify console output...  
    connect();
}, 500);

module.exports = db;