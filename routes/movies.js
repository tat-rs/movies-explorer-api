const express = require('express');

const {
  getMovies,
  createMovie,
  deleteMovieById,
} = require('../controllers/movies');
const { auth } = require('../middlewares/auth');
const { validateCreateMovie, validateMovieId } = require('../middlewares/validation');

const MovieRouter = express.Router();

MovieRouter.use(auth);

MovieRouter.get('/movies', getMovies);

MovieRouter.post('/movies', validateCreateMovie, createMovie);

MovieRouter.delete('/movies/:movieId', validateMovieId, deleteMovieById);

module.exports = MovieRouter;
