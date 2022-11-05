const express = require('express')
const bodyParser = require('body-parser')

const jsonParser = bodyParser.json()
const app = express()
const port = 3000

const users = [];

app.get('/users', (req, res) => {
  return res.send(users).sendStatus(200)
})
app.post('/users',jsonParser, (req, res) => {
  users.push(req.body);
  return res.sendStatus(200)
});
// app.put('/users', (req, res) => {
  
// })
// app.delete('/users', (req, res) => {
  
// })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})