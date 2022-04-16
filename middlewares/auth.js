const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;

const ForbiddenError = require('../errors/ForbiddenError');
const { UNAUTH_ERR_MESSAGE } = require('../utils/constants');

module.exports.auth = (req, res, next) => {
  const token = req.cookies.jwt;

  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'some-super-secret-key');
  } catch (err) {
    next(new ForbiddenError(UNAUTH_ERR_MESSAGE));
  }

  req.user = payload;

  return next();
};
