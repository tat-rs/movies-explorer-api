const { ERROR_CODE_CONFLICT } = require('../utils/constants');

class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERROR_CODE_CONFLICT;
    this.message = message;
  }
}

module.exports = ConflictError;
