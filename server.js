//this is how we import packages in js file
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const port = 3000;
const databasePromise = mongoose.connect("mongodb+srv://Priyanka:PRiyanka1234@cluster0.89mga9g.mongodb.net/?retryWrites=true&w=majority");

const users  = [];
const Cat = mongoose.model('Cat', { name: String });//cat is the name of collection 

//using epress import create an instance of app
const app=express();   
       //express constructor

app.use(express.static("static")); 
//used to serve static file    

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
//return promise
app.post('/api/cat',jsonParser,async(req,res)=>{
  const catObject = req.body;
  const kitty = new Cat(catObject);
  await kitty.save();
  res.send(kitty);
})
//listen help you to start listening to a particular port.
//PORT is a channel available on machine
//8081;4000;3000 are port
// app.listen(port,()=>{
//   console.log(`User app listening on port ${port}`);
// })
 databasePromise
 .then(() => 
 app.listen(port, () => {
  console.log(`User app listening on port ${port}`); 
  })
  )
  .catch((err)=> console.log("failed to connect db",err));
