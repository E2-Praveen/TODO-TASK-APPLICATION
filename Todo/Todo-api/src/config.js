function response(message, status) {
    var data = {
        message: message,
        status: status
    }
    return data
}

module.exports = response