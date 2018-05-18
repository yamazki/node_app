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
    * ユーザネームがDBに存在しているかの確認
    * @param userName ユーザネーム
    * @return 存在した場合はtrue
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
    * 新規ユーザ登録処理
    * @param userName 登録したいユーザネーム
    * @param password パスワード
    * @return ユーザ名が存在していた場合にはfalse,存在していなかったら登録処理を行いtrue
    */
  canAddUser (userName, password) {
    
    //TODO パスワードハッシュ化
    
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
