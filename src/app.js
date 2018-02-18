const express = require('express');
const bodyParser = require('body-parser');
const openroutes = require('./routes/open.routes');
const routes = require('./routes/routes');
const logger = require('./config/env/env').logger;
const mongodb = require('./config/mongo.db');

const app = express();
let error;

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', process.env.ALLOW_ORIGIN || 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Content-Type, Origin');
    next();
});
app.use(bodyParser.json());

// Handle open routes - login and register
openroutes(app);

// On all other routes, check for API key
// app.all('*', (req, res, next) => { });
app.all('*', require('./controllers/authentication.controller').validateApiKey);

// Handle all protected routes - after preprocessing
routes(app);

// Handle all errors
app.use((err, req, res, next) => {
    const error = {
        message: err.message,
        code: err.code,
        name: err.name,
        status: err.status
    }
    res.status(401).json(error).end();
});

app.use('*', (req, res, next) => {
    res.status(400).json({
        'error': 'This route is not available.'
    }).end();
});

module.exports = app;