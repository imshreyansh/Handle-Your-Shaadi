exports.errorResponseHandler = function (res, responseObject, message = "", status = 400) {
    res.status(status).send({
        'error': true,
        'message': message,
        'response': responseObject,
        'status': status
    });
    res.end();
};

exports.successResponseHandler = function (res, responseObject, message = "", status = 200) {
    res.status(status).send({
        'error': false,
        'message': message,
        'response': responseObject,
        'status': status
    });
    res.end();
};
