const User = require('../models/user');

const {
  SUCCESS_CODE_OK,
  ERROR_CODE_UNDEFINED,
} = require('../utils/constants');

const optionsOfData = {
  new: true,
  runValidators: true,
};

const getUserMe = (req, res) => {
  User.findById({ _id: req.user._id })
    .then((user) => {
      if (user) {
        res.status(SUCCESS_CODE_OK).send({ data: user });
      } else {
        res.status(ERROR_CODE_UNDEFINED).send({ message: 'Пользователь с таким id не найден' });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

const uptadeUserProfile = (req, res) => {
  const { name, email } = req.body;

  if (!req.body.name || !req.body.email) {
    return res.status(ERROR_CODE_UNDEFINED).send({ message: 'Переданы некорректные данные' });
  }

  return User.findByIdAndUpdate(req.user._id, { name, email }, optionsOfData)
    .then((user) => {
      if (user) {
        res.status(SUCCESS_CODE_OK).send({ data: user });
      } else {
        res.status(ERROR_CODE_UNDEFINED).send({ message: 'Пользователь с таким id не найден' });
      }
    })
    .catch(() => {
      res.status(ERROR_CODE_UNDEFINED).send({ message: 'Переданы некорректные данные' });
    });
};

module.exports = {
  getUserMe,
  uptadeUserProfile,
};
