const responseMSG = require('../../config')
const TodoTaskDAO = require('../dao/todotask')

function createTask(req, res) {
    return TodoTaskDAO.createTask(req.body).then(function () {
        res.status(201).send(responseMSG.successResponse("Added successfully"))
    }).catch(e => {
        res.status(400).send(responseMSG.failureResponse(e.message))
    })
}

function deleteTask(req,res){
    return TodoTaskDAO.deleteTask(req.body).then(function (){
        res.status(200).send(responseMSG.successResponse("Deleted successfully"))
    }).catch(e =>{
        res.status(400).send(responseMSG.failureResponse(e.message))
    })
}

function updateTask(req,res){
    return TodoTaskDAO.updateTask(req.body).then(function (){
        res.status(200).send(responseMSG.successResponse("Modified successfully"))
    }).catch(e =>{
        // console.log(e.message)
        // console.log(e.name)
        // console.log(e.description)
        // console.log(e.stack)
        // message = JSON.stringify(e.message)
        res.status(400).send(responseMSG.failureResponse(e.message))
    })
}

function fetchTask(req, res) {
    return TodoTaskDAO.fetchTask().then(function (response) {
        res.status(200).send(responseMSG.successResponse(response))
    }).catch(e => {
        res.status(404).send(responseMSG.failureResponse("Unable to Fetch the Task"))
    })
}

module.exports = {
    createTask: createTask,
    fetchTask: fetchTask,
    deleteTask: deleteTask,
    updateTask: updateTask
}