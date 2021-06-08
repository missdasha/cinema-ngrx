class OperationalError extends Error {
  constructor(message, status) {
    super(message);
    this.isOperational = true;
    this.status = status;
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = OperationalError;
