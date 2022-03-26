const express = require('express');

const {
  getMovies,
  createMovie,
  deleteMovieById,
} = require('../controllers/movies');
const { auth } = require('../middlewares/auth');

const MovieRouter = express.Router();

MovieRouter.use(auth);

MovieRouter.get('/movies', getMovies);

MovieRouter.post('/movies', createMovie);

MovieRouter.delete('/movies/:movieId', deleteMovieById);

module.exports = MovieRouter;
