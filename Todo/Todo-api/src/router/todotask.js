const express = require('express')
const router = new express.Router()
const todoTaskController = require('../controller/todotask')


router.post('/newTask', todoTaskController.addTask);
router.delete('/task/deleteTask', todoTaskController.deleteTask);
router.put('/task/taskUpdated', todoTaskController.taskUpdated);
router.get('/fetchingTask', todoTaskController.fetchingTask);


module.exports = router