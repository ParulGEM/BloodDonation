class serverError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.msg = message;
    this.statusCode = statusCode;
    this.status = false;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

export default serverError;
