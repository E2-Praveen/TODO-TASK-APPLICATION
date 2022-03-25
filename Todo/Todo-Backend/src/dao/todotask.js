const connection = require('../db/mariadb');

module.exports = {
    createTask: createTask,
    fetchTask: fetchTask,
    deleteTask: deleteTask,
    updateTask: updateTask,
}

function createTask(data) {
    return new Promise((resolve, reject) => {
        connection.Todo.create(data).then((rowsUpdated) => {
            resolve(rowsUpdated);
        }).catch(err => {
            reject(err);
            return;
        });
    });
}

function deleteTask(data) {
    const where = {
        id: data.id
    }
    return new Promise((resolve, reject) => {
        connection.Todo.destroy({ where: where }).then((rowsUpdated) => {
            resolve(rowsUpdated);
        }).catch(err => {
            reject(err);
            return;
        });
    })
}

function updateTask(data) {
    const where = {
        id: data.id
    }
    return new Promise((resolve, reject) => {
        connection.Todo.update(data, { where: where }).then((rowsUpdated) => {
            resolve(rowsUpdated);
        }).catch(err => {
            reject(err);
            return;
        });
    });
}

function fetchTask() {
    return new Promise((resolve, reject) => {
        connection.Todo.findAll().then(task => {
            resolve(task);
        }).catch(err => {
            reject(err);
            return;
        });
    });
}