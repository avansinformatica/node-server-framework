const Recipe = require('../models/recipe.model');
const logger = require('../config/env/env').logger;

module.exports = {

    getAllRecipes(req, res, next) {
        logger.debug('getAllRecipes called');

        Recipe.find()
            .then(result => {
                res.status(200)
                    .json({
                        'recipes': result
                    })
                    .end();
            })
            .catch(error => next(error));

    },

};