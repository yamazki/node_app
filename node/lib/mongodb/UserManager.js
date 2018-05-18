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
    * $B%f!<%6%M!<%`$,(BDB$B$KB8:_$7$F$$$k$+$N3NG'(B
    * @param userName $B%f!<%6%M!<%`(B
    * @return $BB8:_$7$?>l9g$O(Btrue
    */
  userNameExists (userName) {
    MongoClient.connect(this.url, (error, client) => {
      const db = client.db(this.dbName);
      db.collection(collectionName , (err, collection)  => {
        collection.find({name:{$eq:userName}}).toArray((err, docs) => {
          client.close();
          if(docs.name == userName) {
            return true;
          }
          else {
            return false;
          }
        });
      });
    });
  }
  
  /**
    * $B?75,%f!<%6EPO?=hM}(B
    * @param userName $BEPO?$7$?$$%f!<%6%M!<%`(B
    * @param password $B%Q%9%o!<%I(B
    * @return $B%f!<%6L>$,B8:_$7$F$$$?>l9g$K$O(Bfalse,$BB8:_$7$F$$$J$+$C$?$iEPO?=hM}$r9T$$(Btrue
    */
  canAddUser (userName, password) {
    
    //TODO $B%Q%9%o!<%I%O%C%7%e2=(B
    
    let promise = new Promise(function(resolve, reject) {
      let result = check(userName);
      console.log(result);
      resolve();
    });
    promise.then(function (result) {
      if(result) {
        return false;
      } 
      else {
        return true;
      }
    });
  }
}
