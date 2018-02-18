const AuthController = require('../controllers/authentication.controller');
const UserController = require('../controllers/user.controller');
const RecipeController = require('../controllers/recipe.controller');

module.exports = (app) => {

    app.post('/api/register', AuthController.register);
    app.post('/api/login', AuthController.login);

};