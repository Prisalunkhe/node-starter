//this is how we import packages in js file
const express = require('express');
const bodyParser = require('body-parser');

const port = 3000;

const users  = [];
//using epress import create an instance of app
const app=express();          //express constructor
var jsonParser = bodyParser.json();

//app provide multiple methods for http verbs we can add URL and handler to it
//first param is URL we want to accept request on,next param is call back function to handle request
app.get('/api/users',jsonParser,(req,res)=>{
  res.send(users);
});


app.delete('/api/users/:userID',jsonParser,(req,res)=>{
 const userID = Number(req.params.userID);
 const userToBeRemoved = users.findIndex(user => user.id === userID);
 if(userToBeRemoved === -1) {
  return res.sendStatus(400);
 }
 users.splice(userToBeRemoved, 1);
 res.sendStatus(200);
});

app.get('/api/users/:userID',jsonParser,(req,res)=>{
  const userID = Number(req.params.userID);
  const userToBeSent = users.findIndex(user => user.id === userID);
  if(userToBeSent === -1) {
   return res.sendStatus(400);
  }
  
  res.send(users[userToBeSent]);
 });

app.post('/api/users',jsonParser,(req,res)=>{
  users.push({...req.body, id: Math.floor(Math.random() * 1000000000)})
  res.sendStatus(200);
  
});

//listen help you to start listening to a particular port.
//PORT is a channel available on machine
//8081;4000;3000 are port
app.listen(port, () => {
  console.log(`User app listening on port ${port}`)
  
})
