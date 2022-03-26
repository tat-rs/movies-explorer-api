const User = require('../models/user');

const {
  SUCCESS_CODE_OK,
} = require('../utils/constants');

const {
  BadRequestError,
  NotFoundError,
} = require('../errors/errors');

const optionsOfData = {
  new: true,
  runValidators: true,
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
  getUserMe,
  uptadeUserProfile,
};
