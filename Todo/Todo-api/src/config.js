var express = require('express');
const { router } = require('./app');
const res = new express.response()



router.post('/addTask',(req,res)=> {
    res.status(200).send({message , status})
})

module.exports = res