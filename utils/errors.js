const SUCCESS = 200;
const CREATE = 201;
const BAD_REQUEST = 400;
const INCORRECT = 401;
const REQUEST_DENIED = 403;
const NOT_FOUND = 404;
const REGISTRATION_ERROR = 409;
const DEFAULT = 500;
const ERROR = 11000;

class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 400;
    this.name = "BadRequestError";
  }
}

class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 401;
    this.name = "Unauthorized Error";
  }
}

class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 403;
    this.name = "ForbiddenError";
  }
}

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 404;
    this.name = "NotFoundError";
  }
}

class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 409;
    this.name = "ConflictError";
  }
}

module.exports = {
  SUCCESS,
  CREATE,
  BAD_REQUEST,
  INCORRECT,
  REQUEST_DENIED,
  NOT_FOUND,
  REGISTRATION_ERROR,
  DEFAULT,
  ERROR,
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  ConflictError,
};
