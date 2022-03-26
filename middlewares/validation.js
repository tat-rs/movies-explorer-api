const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

const validateRegister = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email()
      .custom((value, helpers) => {
        if (validator.isEmail(value)) {
          return value;
        }
        return helpers.message({ message: 'Введен некорректный email' });
      }),
    password: Joi.string().required(),
    name: Joi.string().required().min(2).max(30)
      .custom((value, helpers) => {
        if (value.length >= 2 && value.length <= 30) {
          return value;
        }
        return helpers.message('Имя пользователя должно содержать от 2 до 30 символов');
      }),
  }),
});

const validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email()
      .custom((value, helpers) => {
        if (validator.isEmail(value)) {
          return value;
        }
        return helpers.message('Введен некорректный email');
      }),
    password: Joi.string().required(),
  }),
});

const validateUptadeProfile = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email()
      .custom((value, helpers) => {
        if (validator.isEmail(value)) {
          return value;
        }
        return helpers.message('Введен некорректный email');
      }),
    name: Joi.string().required().min(2).max(30)
      .custom((value, helpers) => {
        if (value.length >= 2 && value.length <= 30) {
          return value;
        }
        return helpers.message('Имя пользователя должно содержать от 2 до 30 символов');
      }),
  }),
});

const validateCreateMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required()
      .custom((value, helpers) => {
        if (validator.isURL(value, { require_protocol: true })) {
          return value;
        }
        return helpers.message('Введенное значение не является ссылкой');
      }),
    trailerLink: Joi.string().required()
      .custom((value, helpers) => {
        if (validator.isURL(value, { require_protocol: true })) {
          return value;
        }
        return helpers.message('Введенное значение не является ссылкой');
      }),
    thumbnail: Joi.string().required()
      .custom((value, helpers) => {
        if (validator.isURL(value, { require_protocol: true })) {
          return value;
        }
        return helpers.message('Введенное значение не является ссылкой');
      }),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required()
      .custom((value, helpers) => {
        if (validator.isAlpha(value, ['ru-RU'])) {
          return value;
        }
        return helpers.message('Введите название фильма на русском языке');
      }),
    nameEN: Joi.string().required()
      .custom((value, helpers) => {
        if (validator.isAlpha(value, ['en-US'])) {
          return value;
        }
        return helpers.message('Введите название фильма на английском языке');
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