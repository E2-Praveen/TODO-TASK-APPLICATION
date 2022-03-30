const responseMSG = require('../../config')
const TodoTaskDAO = require('../dao/todotask')

function createTask(req, res) {
    return TodoTaskDAO.createTask(req.body).then(function () {
        res.status(201).send(responseMSG.successResponse(null,"Added successfully"));
        res.statuscode(201);
    }).catch(e => {
        res.status(400).send(responseMSG.failureResponse(e.message))
    })
}

function deleteTask(req,res){
    return TodoTaskDAO.deleteTask(req.body).then(function (){
        res.status(200).send(responseMSG.successResponse(null,"Deleted successfully"))
    }).catch(e =>{
        res.status(400).send(responseMSG.failureResponse(e.message))
    })
}

function updateTask(req,res){
    return TodoTaskDAO.updateTask(req.body).then(function (){
        res.status(200).send(responseMSG.successResponse(null,"Modified successfully"))
    }).catch(e =>{
        res.status(400).send(responseMSG.failureResponse(e.message))
    })
}

function fetchTask(req, res) {
    return TodoTaskDAO.fetchTask().then(function (response) {
        res.status(200).send(responseMSG.successResponse(response,"Task fetched successfully"))
    }).catch(e => {
        res.status(404).send(responseMSG.failureResponse("Unable to Fetch the Task"))
    })
}

function deleteAllTask(req,res){
    return TodoTaskDAO.deleteAllTask().then(function (){
        res.status(200).send(responseMSG.successResponse(null,"Deleted successfully"))
    }).catch(e =>{
        res.status(400).send(responseMSG.failureResponse(e.message))
    })
}

function deleteRandomTask(req,res){
    return TodoTaskDAO.deleteRandomTask(req.body).then(function (){
        res.status(200).send(responseMSG.successResponse(null,"Deleted successfully"))
    }).catch(e =>{
        res.status(400).send(responseMSG.failureResponse(e.message))
    })
}


module.exports = {
    createTask: createTask,
    fetchTask: fetchTask,
    deleteTask: deleteTask,
    updateTask: updateTask,
    deleteAllTask: deleteAllTask,
    deleteRandomTask: deleteRandomTask,
}