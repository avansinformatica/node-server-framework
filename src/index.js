const app = require('./app');
const config = require('./config/env/env');
const logger = config.logger;

app.listen(config.env.webPort, () => {
    logger.info('Server is running on port ' + config.env.webPort);
});