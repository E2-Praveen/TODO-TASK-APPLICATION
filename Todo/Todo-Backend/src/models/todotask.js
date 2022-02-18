const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({
    task: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
}, {
    timestamps: true
})

const Task = mongoose.model('Task', TaskSchema)

module.exports = Task