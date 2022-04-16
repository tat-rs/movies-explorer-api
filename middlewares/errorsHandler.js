const { ERROR_CODE_DEFAULT } = require('../utils/constants');

module.exports.errorsHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || ERROR_CODE_DEFAULT;

  res.status(statusCode).send({ message: err.message });

  next();
};
