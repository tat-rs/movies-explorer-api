const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;

const ForbiddenError = require('../errors/ForbiddenError');

module.exports.auth = (req, res, next) => {
  const token = req.cookies.jwt;

  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'some-super-secret-key');
  } catch (err) {
    next(new ForbiddenError('Необходима авторизация'));
  }

  req.user = payload;

  return next();
};
