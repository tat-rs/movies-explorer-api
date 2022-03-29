const { celebrate, Joi } = require('celebrate');
const validator = require('validator');
const BadRequestError = require('../errors/BadRequestError');
const {
  WRONG_LINK_ERR_MESSAGE,
  INCORRECT_EMAIL_ERR_MESSAGE,
  WRONG_RU_MOVIE_ERR_MESSAGE,
  WRONG_EN_MOVIE_ERR_MESSAGE,
  INCORRECT_USER_NAME_ERR_MESSAGE,
} = require('../utils/constants');

const validateURL = (value) => {
  if (!validator.isURL(value, { require_protocol: true })) {
    throw new BadRequestError(WRONG_LINK_ERR_MESSAGE);
  }
  return value;
};

const validateEmail = (value) => {
  if (!validator.isEmail(value)) {
    throw new BadRequestError(INCORRECT_EMAIL_ERR_MESSAGE);
  }
  return value;
};

const validateUserName = (value) => {
  if (value.length < 2 || value.length > 30) {
    throw new BadRequestError(INCORRECT_USER_NAME_ERR_MESSAGE);
  }
  return value;
};

const validateRegister = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().custom(validateEmail),
    password: Joi.string().required(),
    name: Joi.string().required().min(2).max(30)
      .custom(validateUserName),
  }),
});

const validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().custom(validateEmail),
    password: Joi.string().required(),
  }),
});

const validateUptadeProfile = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().custom(validateEmail),
    name: Joi.string().required().min(2).max(30)
      .custom(validateUserName),
  }),
});

const validateCreateMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().custom(validateURL),
    trailerLink: Joi.string().required().custom(validateURL),
    thumbnail: Joi.string().required().custom(validateURL),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required()
      .custom((value, helpers) => {
        if (validator.isAlpha(value, ['ru-RU'])) {
          return value;
        }
        return helpers.message(WRONG_RU_MOVIE_ERR_MESSAGE);
      }),
    nameEN: Joi.string().required()
      .custom((value, helpers) => {
        if (validator.isAlpha(value, ['en-US'])) {
          return value;
        }
        return helpers.message(WRONG_EN_MOVIE_ERR_MESSAGE);
      }),
  }),
});

const validateMovieId = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().length(24).hex().required(),
  }),
});

module.exports = {
  validateRegister,
  validateLogin,
  validateUptadeProfile,
  validateCreateMovie,
  validateMovieId,
};
