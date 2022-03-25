const express = require('express')
const router = new express.Router()
const todoTaskController = require('../controller/todotask');


router.post('/createTask', todoTaskController.createTask);
router.get('/fetchTask', todoTaskController.fetchTask);
router.delete('/deleteTask', todoTaskController.deleteTask);
router.put('/updateTask', todoTaskController.updateTask);


module.exports = router