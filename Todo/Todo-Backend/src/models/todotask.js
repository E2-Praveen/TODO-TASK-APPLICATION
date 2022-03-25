module.exports = (sequelize, type) => {
    return sequelize.define('TodoTasks', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        task: {
            type: type.STRING,
            required: true
        },
        completed: {
            type: type.BOOLEAN,
            defaultValue: false
        },
    }, {
        timestamps: true
    })
}