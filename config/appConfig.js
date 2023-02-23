const dbConfig = require('./dbConfig.json')[process.env.NODE_ENV]

let appConfig = {};

appConfig.allowedCorsOrigin = "*";

appConfig.apiVersion = '/api/v1/';

appConfig.db = {
    uri: `mongodb+srv://${dbConfig.username}:${dbConfig.password}@nodemongo.kwqyhp5.mongodb.net/?retryWrites=true&w=majority`
  };



module.exports = appConfig;