const bcrypt = require('bcryptjs');
const User = require('../models/user');
const hat = require('hat');
const env = require('../config/env/env');
const logger = env.logger;

module.exports = {

    register(req, res, next) {
        logger.info('Register called');

        if (!req.body.name || req.body.name === undefined) {
            const error = new Error('Name is missing in request body.')
            logger.error(error.toString())
            next(error);
        } else if (!req.body.password || req.body.password === undefined) {
            const error = new Error('Password is missing in request body.')
            logger.error(error.toString())
            next(error);
        } else if (!req.body.email || req.body.email === undefined) {
            const error = new Error('Email address is missing in request body.')
            logger.error(error.toString())
            next(error);
        } else {
            const apikey = hat();
            const password = bcrypt.hashSync(req.body.password, 2);
            const user = new User({
                'name': req.body.name,
                'password': password,
                'email': req.body.email,
                'apikey': apikey
            });

            logger.debug('Check for existing email address.');
            User.find({
                    'email': req.body.email
                })
                .then(result => {
                    if (result.length > 0) {
                        const error = new Error('Email address already exists.')
                        logger.error(error.toString());
                        throw error;
                    } else {
                        logger.debug('Saving new user.');
                        return user.save();
                    }
                })
                .then(result => {
                    logger.debug('Successfully saved new user.');
                    res.status(200)
                        .json({
                            'apikey': apikey
                        })
                        .end();
                })
                .catch((error) => {
                    logger.error('Error saving new user. ' + error.toString());
                    next(error);
                });
        }
    },

    login(req, res, next) {
        let password = req.body.password;
        let email = req.body.email;
        let msg;

        User.findOne({
                'email': email
            })
            .then((user) => {
                if (!user) {
                    msg = 'No user found.';
                    logger.debug(msg);
                    res.status(400).json({
                            message: msg
                        })
                        .end();
                }
                if (bcrypt.compareSync(password, user.password)) {
                    logger.debug('user found: ' + user);
                    res.status(200).json({
                            user: user
                        })
                        .end();
                } else {
                    msg = 'No user found with this email/password combination';
                    logger.debug(msg);
                    res.status(400).json({
                            message: msg
                        })
                        .end();
                }
            })
            .catch((error) => next(error));
    },

    validateApiKey(req, res, next) {
        if (req.query.apikey) {
            logger.debug('Checking apikey');
            const apikey = req.query.apikey;
            User.findOne({
                    'apikey': apikey
                })
                .then(user => {
                    if (user === undefined || user === null) {
                        error = new Error('The provided API key is not a valid key. Register to get a valid key.');
                        logger.debug(error.toString());
                        next(error);
                    } else {
                        logger.debug('Apikey found, user is ' + user.name);
                        next();
                    }
                })
                .catch(error => {
                    error = new Error('The provided API key is not a valid key. Register to get a valid key.');
                    logger.debug(error.toString());
                    next(error);
                });
        } else {
            error = new Error('A call to endpoints other than register or login requires an api key.');
            next(error);
        }
    }
};