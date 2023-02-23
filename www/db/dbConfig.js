const mongoose = require('mongoose');
const server = require('../rest/server');
const appConfig = require('../../config/appConfig');


const startDB = (app) => {
    /**
 * database connection settings
 */

  mongoose.connect(appConfig.db.uri,{ useNewUrlParser: true, useUnifiedTopology: true});
  mongoose.set('debug', true)
  
   mongoose.connection.on('error', function (err) {
    console.log(`database error:${err}`);
    process.exit(1)
  }); // end mongoose connection error
  
  mongoose.connection.on('open', function (err) {
    if (err) {
      console.log(`database error:${JSON.stringify(err)}`);
      process.exit(1)
    } else {
      console.log("database connection open success");
      /**
      * Create HTTP server.
      */
       server.startServer(app);
    }
  }); // end mongoose connection open handler
}


module.exports = {
    startDB:startDB
}
  