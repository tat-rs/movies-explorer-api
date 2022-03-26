const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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
  UnauthorizatedError,
} = require('../errors/errors');

const { NODE_ENV, JWT_SECRET } = process.env;

const optionsOfData = {
  new: true,
  runValidators: true,
};

const createUser = (req, res, next) => {
  const { email, password, name } = req.body;

  if (!email || !password || !name) {
    throw new BadRequestError('Заполните все обязательные поля');
  }
  // хэшируем пароль
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

const login = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError('Не передан email или пароль');
  }

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
      });
      res.send({ token });
    })
    .catch((err) => {
      next(new UnauthorizatedError(err.message));
    });
};

const signout = (req, res) => {
  res.status(SUCCESS_CODE_OK).clearCookie('jwt').send({ message: 'Пользователь вышел из системы' });
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
  login,
  signout,
  getUserMe,
  uptadeUserProfile,
};
