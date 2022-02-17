function successResponse(message) {
    var data = {
        message: message,
        "status": "success"
    }
    return data
}

function failureResponse(message) {
    var data = {
        message: message,
        "status": "Failure"
    }
    return data
}

module.exports = {
    successResponse: successResponse,
    failureResponse: failureResponse
}