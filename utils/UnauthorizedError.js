class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 401;
    this.name = "Unauthorized Error";
  }
}

module.exports = UnauthorizedError;
