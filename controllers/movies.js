const Movie = require('../models/movie');

const {
  SUCCESS_CODE_OK,
  SUCCESS_CODE_CREATED,
  ERROR_CODE_UNDEFINED,
} = require('../utils/constants');

const getMovies = (req, res) => {
  Movie.find({})
    .populate('owner')
    .then((data) => {
      // eslint-disable-next-line max-len
      const usersMovie = data.filter((movie) => String(movie.owner._id) === String(req.user._id));
      if (usersMovie.length > 0) {
        res.status(SUCCESS_CODE_OK).send({ movies: usersMovie });
      } else {
        res.status(ERROR_CODE_UNDEFINED).send({ message: 'Не найдены сохраненные фильмы' });
      }
    })
    .catch((err) => console.log(err));
};

const createMovie = (req, res) => {
  const {
    // eslint-disable-next-line max-len
    country, director, duration, year, description, image, trailerLink, nameRU, nameEN, thumbnail, movieId,
  } = req.body;

  // eslint-disable-next-line max-len
  if (!country || !director || !duration || !year || !description || !image || !trailerLink || !nameRU || !nameEN || !thumbnail || !movieId) {
    return res.status(ERROR_CODE_UNDEFINED).send({ message: 'Введены не все обязательные поля' });
  }

  return Movie.create({
    // eslint-disable-next-line max-len
    country, director, duration, year, description, image, trailerLink, nameRU, nameEN, thumbnail, movieId, owner: req.user._id,
  })
    .then((movie) => {
      res.status(SUCCESS_CODE_CREATED).send({ data: movie });
    })
    .catch((err) => res.status(ERROR_CODE_UNDEFINED).send({ message: err.message }));
};

const deleteMovieById = (req, res, next) => {
  const { movieId } = req.params;
  Movie.findById(movieId)
    .then((movie) => {
      if (!movie) {
        res.status(ERROR_CODE_UNDEFINED).send({ message: 'Фильм с таким id не найден' });
      } else if (String(movie.owner) === String(req.user._id)) {
        Movie.findByIdAndRemove(movieId)
          .then((deletedMovie) => {
            res.status(SUCCESS_CODE_OK).send({ data: deletedMovie });
          })
          .catch((err) => {
            next(err);
          });
      } else {
        res.status(ERROR_CODE_UNDEFINED).send({ message: 'Нельзя удалять карточки другого пользователя' });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovieById,
};
