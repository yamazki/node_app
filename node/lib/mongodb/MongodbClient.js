const url = "mongodb://mongodb:27017";
const dbName = "test";
const UserManager  = require('./UserManager.js'); 

module.exports = class MongodbClient {
  
  constructor() {
    this.userManager = new UserManager(url, dbName);
  }
  
}
