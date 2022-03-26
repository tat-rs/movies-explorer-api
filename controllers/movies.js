const Movie = require('../models/movie');

const {
  SUCCESS_CODE_OK,
  SUCCESS_CODE_CREATED,
} = require('../utils/constants');

const {
  BadRequestError,
  ForbiddenError,
  NotFoundError,
} = require('../errors/errors');

const getMovies = (req, res, next) => {
  Movie.find({})
    .populate('owner')
    .then((data) => {
      const usersMovie = data.filter((movie) => String(movie.owner._id) === String(req.user._id));
      if (usersMovie.length > 0) {
        res.status(SUCCESS_CODE_OK).send({ usersMovie });
      } else {
        throw new NotFoundError('Не найдены сохраненные фильмы');
      }
    })
    .catch(next);
};

const createMovie = (req, res, next) => {
  const {
    // eslint-disable-next-line max-len
    country, director, duration, year, description, image, trailerLink, nameRU, nameEN, thumbnail, movieId,
  } = req.body;

  // eslint-disable-next-line max-len
  if (!country || !director || !duration || !year || !description || !image || !trailerLink || !nameRU || !nameEN || !thumbnail || !movieId) {
    throw new NotFoundError('Не все обязательные поля указаны');
  }

  return Movie.create({
    // eslint-disable-next-line max-len
    country, director, duration, year, description, image, trailerLink, nameRU, nameEN, thumbnail, movieId, owner: req.user._id,
  })
    .then((movie) => {
      Movie.findById(movie._id)
        .populate('owner')
        .then((newMovie) => {
          res.status(SUCCESS_CODE_CREATED).send({ newMovie });
        })
        .catch(next);
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new BadRequestError(`Переданы некорректные данные: ${err}`));
      } else {
        next(err);
      }
    });
};

const deleteMovieById = (req, res, next) => {
  const { movieId } = req.params;

  Movie.findById(movieId)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError('Фильм с таким id не найден');
      } else if (String(movie.owner) === String(req.user._id)) {
        Movie.findByIdAndRemove(movieId)
          .then((deletedMovie) => {
            res.status(SUCCESS_CODE_OK).send({ deletedMovie });
          })
          .catch((err) => {
            next(err);
          });
      } else {
        throw new ForbiddenError('Нельзя удалять сохраненные фильмы другого пользователя');
      }
    })
    .catch(next);
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovieById,
};
