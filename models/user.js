const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const BadRequestError = require('../errors/BadRequestError');
const UnauthorizatedError = require('../errors/UnauthorizatedError');
const { INCORRECT_EMAIL_ERR_MESSAGE, WRONG_EMAIL_OR_PASSWORD_ERR_MESSAGE } = require('../utils/constants');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: INCORRECT_EMAIL_ERR_MESSAGE,
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new BadRequestError(WRONG_EMAIL_OR_PASSWORD_ERR_MESSAGE);
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error(WRONG_EMAIL_OR_PASSWORD_ERR_MESSAGE));
          }
          return user;
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      throw new UnauthorizatedError(err.message);
    });
};

module.exports = mongoose.model('user', userSchema);
