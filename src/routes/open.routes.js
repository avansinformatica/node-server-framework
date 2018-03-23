const AuthController = require('../controllers/authentication.controller');
const UserController = require('../controllers/user.controller');
const RecipeController = require('../controllers/recipe.controller');
const TechnologyController = require('../controllers/technology.controller');

module.exports = (app) => {

    app.post('/api/register', AuthController.register);
    app.post('/api/login', AuthController.login);

    app.get('/api/technologies', TechnologyController.getAllItems);
    app.post('/api/technologies', TechnologyController.createNewItem);
    app.get('/api/technologies/:id', TechnologyController.getItemById);
    app.put('/api/technologies/:id', TechnologyController.updateItem);

};