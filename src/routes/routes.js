const AuthController = require('../controllers/authentication.controller');
const UserController = require('../controllers/user.controller');
const RecipeController = require('../controllers/recipe.controller');

module.exports = (app) => {

    // app.post('/api/user/register', AuthController.register);
    // app.post('/api/user/login', AuthController.login);

    app.get('/api/users', UserController.getAllUsers);
    app.get('/api/users/:userId', UserController.getUserById);
    app.get('/api/users/email/:email', UserController.getUserByEmail);
    app.post('/api/users', UserController.addUser);

    app.get('/api/recipes', RecipeController.getAllRecipes);

};