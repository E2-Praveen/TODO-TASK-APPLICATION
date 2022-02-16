const express = require('express')
const Task = require('../models/todotask')
const router = new express.Router()
const response = require('../config')

//Create Task Module
router.post('/newTask', async (req, res) => {
    const task = await new Task(req.body)
    try {
        await task.save()
        res.status(201).send(response("AddedSuccessfully", "success"))
    } catch (e) {
        res.status(400).send(response(e._message, "Failure"))
    }
})

//Delete Task Module
router.delete('/task/deleteTask', async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete({ _id: req.body._id })
        if (!task) {
            res.status(404).send(response('No Task Found..!', "Failure"))
        }
        res.status(200).send(response("Deleted successfully", "success"))
    } catch (e) {
        res.status(500).send(response(e.message, "Failure"))
    }
})

//Update Task Module
router.put('/task/taskUpdated', async (req, res) => {
    const updates = Object.keys(req.body)
    const id = updates.indexOf("_id")
    updates.splice(id, 1)
    const allowedUpdates = ['task', 'completed']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        res.status(400).send(response('Invalid Updates..!', "Failure"))
    }

    try {
        const task = await Task.findById(req.body._id)
        if (!task) {
            res.status(404).send(response("Unable to find task..!", "Failure"))
        }
        updates.forEach((update) => task[update] = req.body[update])
        await task.save()
        res.status(200).send(response("Modified successfully", "success"))
    } catch (e) {
        res.status(400).send(response(e.message, "Failure"))
    }
})

//Get All task
router.get('/fetchingTask', async (req, res) => {
    try {
        const task = await Task.find()
        res.send(task)
    } catch (e) {
        res.status(404).send(response("Unable to Fetch the Task", "Failure"))
    }
})

module.exports = router