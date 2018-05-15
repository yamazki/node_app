const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const assert = require('assert');
const url = "mongodb://mongodb:27017";


app.get("/", function(req, res){
  res.sendFile(__dirname + "/views/index.html");
  let firstConnectMessage = "new connect";
  io.emit("new connect", firstConnectMessage);
  });

app.get("/test/", function(req, res){
  MongoClient.connect(url, (error, client) => {
    const db = client.db("test");
    db.collection("user", (err, collection)  => {
      collection.find().toArray((err, docs) => {
        io.emit("new connect", docs);
      });
    });
  });
 res.send();
});

http.listen(3000, function () {
  console.log('Example app listening on port 3000!');
  });

