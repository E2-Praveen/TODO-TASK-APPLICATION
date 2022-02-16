const express = require('express')
const Task = require('../models/todotask')
const router = new express.Router()


//Create Task Module
router.post('/newTask', async (req, res) => {
    const task = await new Task(req.body)
    try {
        await task.save()
        res.status(201).send({ message: "Added Successfully", status : "success"})
    } catch (e) {
        res.status(400).send({message:"Path 'task' is required", status: "Failure"})
    }
})

//Delete Task Module
router.delete('/task/deleteTask', async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({ _id: req.body._id })
        if (!task) {
            res.status(404).send({ message: 'No Task Found..!' , status: "Failure"})
        }
        res.status(200).send({ message: "Deleted successfully", status : "success"})
    } catch (e) {
        res.status(500).send({message:"Path is required", status: "Failure"})
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
        res.status(400).send({ message: 'Invalid Updates..!' , status: "Failure" })
    }

    try {
        const task = await Task.findById(req.body._id)
        if (!task) {
            res.status(404).send({ message: 'Unable to find task..!' , status: "Failure" })
        }
        updates.forEach((update) => task[update] = req.body[update])
        await task.save()
        res.status(200).send({ message: "Modified successfully", status : "success"})
    } catch (e) {
        res.status(400).send({message:"Path is required", status: "Failure"})
    }
})

//Get All task
router.get('/fetchingTask', async (req, res) => {
    const task = await Task.find()
    res.send(task)
})

module.exports = router