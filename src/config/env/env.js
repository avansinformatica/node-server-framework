var env = {
  webPort: process.env.PORT || 3000,
  dbHost: process.env.DB_HOST || 'localhost',
  dbPort: process.env.DB_PORT || '',
  dbUser: process.env.DB_USER || '',
  dbPassword: process.env.DB_PASSWORD || '',
  dbDatabase: process.env.DB_DATABASE || 'server_db',
}

var dburl = process.env.NODE_ENV === 'production' ?
  'mongodb://' + env.dbUser + ':' + env.dbPassword + '@' + env.dbHost + ':' + env.dbPort + '/' + env.dbDatabase :
  'mongodb://localhost/' + env.dbDatabase

var logger = require('tracer')
  .console({
    format: [
      "{{timestamp}} <{{title}}> {{file}}:{{line}} : {{message}}"
    ],
    preprocess: function (data) {
      data.title = data.title.toUpperCase();
    },
    dateformat: "isoUtcDateTime",
    level: env.loglevel
  });

module.exports = {
  env: env,
  dburl: dburl,
  logger: logger
};