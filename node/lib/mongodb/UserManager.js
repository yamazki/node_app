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
    * 登録したいユーザネームがDBに存在しているかの確認
    * @param userName 登録したいユーザネーム
    * @return 存在した場合はtrue
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
    * 新規ユーザ登録処理
    * @param userName 登録したいユーザネーム
    * @param password パスワード
    */
  userRegisteration (userName, password) {
    
    //TODO パスワードハッシュ化
    
    console.log("root");
    
  }
}
