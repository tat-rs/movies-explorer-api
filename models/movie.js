const mongoose = require('mongoose');
const validator = require('validator');
const { WRONG_LINK_ERR_MESSAGE, WRONG_RU_MOVIE_ERR_MESSAGE, WRONG_EN_MOVIE_ERR_MESSAGE } = require('../utils/constants');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: (v) => validator.isURL(v, { require_protocol: true }),
      message: WRONG_LINK_ERR_MESSAGE,
    },
  },
  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator: (v) => validator.isURL(v, { require_protocol: true }),
      message: WRONG_LINK_ERR_MESSAGE,
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator: (v) => validator.isURL(v, { require_protocol: true }),
      message: WRONG_LINK_ERR_MESSAGE,
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  // должен быть id из MoviesExplorer
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
    validate: {
      validator: (v) => validator.isAlpha(v, ['ru-RU']),
      message: WRONG_RU_MOVIE_ERR_MESSAGE,
    },
  },
  nameEN: {
    type: String,
    required: true,
    validate: {
      validator: (v) => validator.isAlpha(v, ['en-US']),
      message: WRONG_EN_MOVIE_ERR_MESSAGE,
    },
  },
});

module.exports = mongoose.model('movie', movieSchema);
