const TodoTask = require('../models/todotask');

const sequelize = require('sequelize')
const sequelizeData = new sequelize('Todo_Task_DB', 'root', 'my-password-here', {
    dialect: 'mariadb'
})

const Todo = TodoTask(sequelizeData, sequelize.DataTypes);

module.exports = {
    Todo
}