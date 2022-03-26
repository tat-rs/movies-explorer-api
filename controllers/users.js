const bcrypt = require('bcryptjs');

const User = require('../models/user');

const {
  SUCCESS_CODE_OK,
  SUCCESS_CODE_CREATED,
  ERROR_CODE_DUPLICATE,
  SOLT_ROUND,
} = require('../utils/constants');

const {
  BadRequestError,
  NotFoundError,
  ConflictError,
} = require('../errors/errors');

const optionsOfData = {
  new: true,
  runValidators: true,
};

const createUser = (req, res, next) => {
  const { email, password, name } = req.body;

  if (!email || !password || !name) {
    throw new BadRequestError('Заполните все обязательные поля');
  }

  bcrypt.hash(password, SOLT_ROUND)
    .then((hash) => User.create({ email, password: hash, name }))
    .then(() => res.status(SUCCESS_CODE_CREATED).send({ email, name }))
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new BadRequestError(`Переданы некорректные данные${err.errors.email ? `: ${err.errors.email.message}` : ''}`));
      } else if (err.code === ERROR_CODE_DUPLICATE) {
        next(new ConflictError('Пользователь уже зарегистрирован'));
      } else {
        next(err);
      }
    });
};

const getUserMe = (req, res, next) => {
  User.findById({ _id: req.user._id })
    .then((user) => {
      if (user) {
        res.status(SUCCESS_CODE_OK).send({ user });
      } else {
        throw new NotFoundError('Пользователь с таким id не найден');
      }
    })
    .catch(next);
};

const uptadeUserProfile = (req, res, next) => {
  const { name, email } = req.body;

  if (!req.body.name || !req.body.email) {
    throw new BadRequestError('Переданы некорректные данные');
  }

  return User.findByIdAndUpdate(req.user._id, { name, email }, optionsOfData)
    .then((user) => {
      if (user) {
        res.status(SUCCESS_CODE_OK).send({ user });
      } else {
        throw new NotFoundError('Пользователь с таким id не найден');
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};

module.exports = {
  createUser,
  getUserMe,
  uptadeUserProfile,
};
