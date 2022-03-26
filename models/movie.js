const mongoose = require('mongoose');
const validator = require('validator');

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
      message: 'Введенное значение не является ссылкой',
    },
  },
  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator: (v) => validator.isURL(v, { require_protocol: true }),
      message: 'Введенное значение не является ссылкой',
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator: (v) => validator.isURL(v, { require_protocol: true }),
      message: 'Введенное значение не является ссылкой',
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
      message: 'Введите название фильма на русском языке',
    },
  },
  nameEN: {
    type: String,
    required: true,
    validate: {
      validator: (v) => validator.isAlpha(v, ['en-US']),
      message: 'Введите название фильма на английском языке',
    },
  },
});

module.exports = mongoose.model('movie', movieSchema);
