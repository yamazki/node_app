const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const mongodb = require('mongodb');
const bodyParser = require('body-parser');
const MongodbClient = require('./lib/mongodb/MongodbClient.js'); 
  
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

let mongodbClient = new MongodbClient();

app.get("/", function(req, res){
  res.sendFile(__dirname + "/views/index.html");
  let firstConnectMessage = "new connect";
});

app.get("/editor", function(req, res){
  res.sendFile(__dirname + "/views/editor.html");
  let firstConnectMessage = "new connect";
});

app.post("/login", function(req, res){
  res.sendFile(__dirname + "/views/index.html");
  console.log(req.body);
});

app.get("/login", function(req, res){
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/signup", function(req, res){
  res.sendFile(__dirname + "/views/signup.html");
});

app.post("/signup", function(req, res){
  if(mongodbClient.userManager.canAddUser(req.body.userName, req.body.password)) {
    console.log("user name is add");
  }
  else {
    console.log("user name is used");
  }
  res.send();
});

  

http.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

