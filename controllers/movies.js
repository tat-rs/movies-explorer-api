const Movie = require('../models/movie');

const {
  SUCCESS_CODE_OK,
  SUCCESS_CODE_CREATED,
  MOVIES_NOT_FOUND_ERR_MESSAGE,
  BAD_REQUEST_ERR_MESSAGE,
  WRONG_ID_MOVIE_ERR_MESSAGE,
  FORBIDDEN_ERR_MESSAGE,
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
        throw new NotFoundError(MOVIES_NOT_FOUND_ERR_MESSAGE);
      }
    })
    .catch(next);
};

const createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;

  return Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner: req.user._id,
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
        next(new BadRequestError(BAD_REQUEST_ERR_MESSAGE));
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
        throw new NotFoundError(WRONG_ID_MOVIE_ERR_MESSAGE);
      } else if (String(movie.owner) === String(req.user._id)) {
        Movie.findByIdAndRemove(movieId)
          .then((deletedMovie) => {
            res.status(SUCCESS_CODE_OK).send({ deletedMovie });
          })
          .catch((err) => {
            next(err);
          });
      } else {
        throw new ForbiddenError(FORBIDDEN_ERR_MESSAGE);
      }
    })
    .catch(next);
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovieById,
};
