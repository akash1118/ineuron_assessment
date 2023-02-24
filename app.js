const envConf = require('dotenv').config({ debug: process.env.DEBUG });
const swaggerTools = require('swagger-tools');

let swaggerDoc = require('./swagger.json');

const options = {
  controllers: './src/controllers'
  }

if (envConf.error) {
  throw envConf.error
}


swaggerTools.initializeMiddleware(swaggerDoc, (middleware) => {
  app.use(middleware.swaggerMetadata())
  app.use(middleware.swaggerValidator())
  app.use(middleware.swaggerRouter(options))
  app.use(middleware.swaggerUi())
})

const express = require('express');
const database = require('./www/db/dbConfig');
const appConfig = require('./config/appConfig');
const fs = require('fs');
const path = require('path');


const app = express();



app.use(express.json());


app.all(appConfig.allowedCorsOrigin, function(req, res, next) {
  res.header("Access-Control-Allow-Origin", appConfig.allowedCorsOrigin);
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,token,key");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
  next();
});



// Bootstrap route
const routesPath = './src/routes';
fs.readdirSync(routesPath).forEach(function (file) {
  if (~file.indexOf('.js')) {
    let route = require(routesPath + '/' + file);
    route.setRouter(app);
  }
});
// end bootstrap route

/* Start Database*/

database.startDB(app);