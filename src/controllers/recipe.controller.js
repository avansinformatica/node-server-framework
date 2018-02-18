const logger = require('../config/env/env').logger;

module.exports = {

    getAllRecipes(req, res, next) {
        logger.debug('getAllRecipes called');

        res.status(200)
            .json({
                'result': {
                    'name': 'Spaghetti bolognese'
                }
            })
            .end();

    },

};