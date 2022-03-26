const { ERROR_CODE_DEFAULT } = require('../utils/constants');

module.exports.errorsHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || ERROR_CODE_DEFAULT;
  const errMessage = err.message || 'Произошла ошибка на стороне сервера';

  res.status(statusCode).send({ message: errMessage });

  next();
};
