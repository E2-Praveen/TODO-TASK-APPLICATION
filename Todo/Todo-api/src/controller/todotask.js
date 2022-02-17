const Task = require('../models/todotask')
const response = require('../../config')


async function addTask(req, res) {
    const task = await new Task(req.body)
    try {
        await task.save()
        res.status(201).send(response.successResponse("AddedSuccessfully"))
    } catch (e) {
        res.status(400).send(response.failureResponse(e._message))
    }
}

async function deleteTask(req, res) {
    try {
        const task = await Task.findByIdAndDelete({ _id: req.body._id })
        if (!task) {
            res.status(404).send(response.failureResponse('No Task Found..!'))
        }
        res.status(200).send(response.successResponse("Deleted successfully"))
    } catch (e) {
        res.status(500).send(response.failureResponse(e.message))
    }
}

async function taskUpdated(req, res) {
    const updates = Object.keys(req.body)
    try {
        const task = await Task.findById(req.body._id)
        if (!task) {
            res.status(404).send(response.failureResponse("Unable to find task..!"))
        }
        updates.forEach((update) => task[update] = req.body[update])
        await task.save()
        res.status(200).send(response.successResponse("Modified successfully"))
    } catch (e) {
        res.status(400).send(response.failureResponse(e.message))
    }
}

async function fetchingTask(req, res) {
    try {
        const task = await Task.find()
        res.status(200).send(task)
    } catch (e) {
        res.status(404).send(response.failureResponse("Unable to Fetch the Task"))
    }
}

module.exports = {
    addTask: addTask,
    deleteTask: deleteTask,
    taskUpdated: taskUpdated,
    fetchingTask: fetchingTask
}