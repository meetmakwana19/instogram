// ApiError is custom class inherited from the NodeJS class of Error
class ApiError extends Error {
  constructor(statusCode, message, err) {
    super(message);

    this.statusCode = statusCode;
    this.err = err;

    // capturing error stack
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = ApiError;
