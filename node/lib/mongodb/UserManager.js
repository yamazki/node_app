const express = require('express');
const app = express();
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const assert = require('assert');
const passport = require('passport'); 
const collectionName = "user";

app.use(passport.initialize());

module.exports = class UserManager  {
  
  constructor(url, dbName) {
    this.url = url;
    this.dbName = dbName;
  }
  /**
    * $BEPO?$7$?$$%f!<%6%M!<%`$,(BDB$B$KB8:_$7$F$$$k$+$N3NG'(B
    * @param userName $BEPO?$7$?$$%f!<%6%M!<%`(B
    * @return $BB8:_$7$?>l9g$O(Btrue
    */
  userNameExists (userName) {
    MongoClient.connect(this.url, (error, client) => {
      const db = client.db(this.dbName);
      db.collection(collectionName , (err, collection)  => {
        collection.find({name:{$eq:userName}}).toArray((err, docs) => {
          for (let doc of docs) {
            console.log(doc.name);
            if(doc.name == userName) {
              console.log("user name is used");
              return true
            }
            else {
              console.log("user name is add");
              return false
            }
          }
          client.close();
        });
      });
    });
  }
  
  /**
    * $B?75,%f!<%6EPO?=hM}(B
    * @param userName $BEPO?$7$?$$%f!<%6%M!<%`(B
    * @param password $B%Q%9%o!<%I(B
    */
  userRegisteration (userName, password) {
    
    //TODO $B%Q%9%o!<%I%O%C%7%e2=(B
    
    console.log("root");
    
  }
}
