const { ERROR_UNAUTHORIZATED } = require('../utils/constants');

class UnauthorizatedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERROR_UNAUTHORIZATED;
  }
}

module.exports = UnauthorizatedError;
