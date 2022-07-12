const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const {
  SUCCESS_CODE_OK,
  SUCCESS_CODE_CREATED,
  ERROR_CODE_DUPLICATE,
  SOLT_ROUND,
  BAD_REQUEST_ERR_MESSAGE,
  CONFLICT_ERR_MESSAGE,
  WRONG_ID_USER_ERR_MESSAGE,
  SIGNOUT_SUCCESS_MESSAGE,
  DOMAINS,
} = require('../utils/constants');

const {
  BadRequestError,
  NotFoundError,
  ConflictError,
  UnauthorizatedError,
} = require('../errors/errors');

const { NODE_ENV, JWT_SECRET } = process.env;

const optionsOfData = {
  new: true,
  runValidators: true,
};

const createUser = (req, res, next) => {
  const { email, password, name } = req.body;

  // хэшируем пароль
  bcrypt.hash(password, SOLT_ROUND)
    .then((hash) => User.create({ email, password: hash, name }))
    .then(() => res.status(SUCCESS_CODE_CREATED).send({ email, name }))
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new BadRequestError(BAD_REQUEST_ERR_MESSAGE));
      } else if (err.code === ERROR_CODE_DUPLICATE) {
        next(new ConflictError(CONFLICT_ERR_MESSAGE));
      } else {
        next(err);
      }
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'some-super-secret-key',
        { expiresIn: '7d' },
      );
      res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        sameSite: 'none',
        secure: true,
        domains: DOMAINS,
      });
      res.send({ token });
    })
    .catch((err) => {
      next(new UnauthorizatedError(err.message));
    });
};

const signout = (req, res) => {
  res.status(SUCCESS_CODE_OK).clearCookie('jwt').send({ message: SIGNOUT_SUCCESS_MESSAGE });
};

const getUserMe = (req, res, next) => {
  User.findById({ _id: req.user._id })
    .then((user) => {
      if (user) {
        res.status(SUCCESS_CODE_OK).send({ user });
      } else {
        throw new NotFoundError(WRONG_ID_USER_ERR_MESSAGE);
      }
    })
    .catch(next);
};

const uptadeUserProfile = (req, res, next) => {
  const { name, email } = req.body;

  return User.findByIdAndUpdate(req.user._id, { name, email }, optionsOfData)
    .then((user) => {
      if (user) {
        res.status(SUCCESS_CODE_OK).send({ user });
      } else {
        throw new NotFoundError(WRONG_ID_USER_ERR_MESSAGE);
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new BadRequestError(BAD_REQUEST_ERR_MESSAGE));
      } else if (err.code === ERROR_CODE_DUPLICATE) {
        next(new ConflictError(CONFLICT_ERR_MESSAGE));
      } else {
        next(err);
      }
    });
};

module.exports = {
  createUser,
  login,
  signout,
  getUserMe,
  uptadeUserProfile,
};
