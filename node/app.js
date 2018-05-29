const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const mongodb = require('mongodb');
const bodyParser = require('body-parser');
const MongodbClient = require('./lib/mongodb/MongodbClient.js'); 
const mongodbClient = new MongodbClient();
  
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

userRegister = async () => {
  console.log("root");
  let result = await mongodbClient.userManager.userNameExists("root")
  if(result) {
  console.log("registration fault");
  }
  else {
    await mongodbClient.userManager.userRegisteration("root", "password");
    console.log("registration successed");
  }
};

userRegister();

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
  mongodbClient.userManager.canAddUser(req.body.userName, req.body.password)
  res.send();
});

  

http.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

