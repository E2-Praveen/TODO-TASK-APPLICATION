const express = require('express')
require('./db/mongoose')
const taskRouter = require('./router/todotask')

const app = express()
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "*")
    next();
  });
app.use(express.json())
app.use(taskRouter)

module.exports = app