const ApiError = require("../utils/ApiError");

module.exports = (err, req, res, next) => {
    // if (err, req, res, ) just these 3 params r passed then express interprets err as req, req as res and res as next...
    // so express understands it as a error handler only if 4 params are passed

    // filter for mongoose error
    // const HTTPStatusCode = err instanceof MongooseError ? 400 : 422
    let HTTPStatusCode = 400

    const responseObject = {
        message: "Internal server error",
        error: err.message ? err.message : err.toString()
    }

    if (err instanceof ApiError) {
        HTTPStatusCode = err.statusCode
        responseObject.error = err.err
        responseObject.message = err.message
    }
    
    return res
        .status(HTTPStatusCode).json({
            // message: "",
            // error: err.message ? err.message : err.toString()
            ...responseObject
        })
}