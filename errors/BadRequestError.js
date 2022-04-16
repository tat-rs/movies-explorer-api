const { ERROR_CODE_NOCORRECT } = require('../utils/constants');

class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERROR_CODE_NOCORRECT;
  }
}

module.exports = BadRequestError;
