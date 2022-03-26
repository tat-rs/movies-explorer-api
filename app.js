const express = require('express');
const mongoose = require('mongoose');

const userRouter = require('./routes/users');
const MovieRouter = require('./routes/movies');
/* const { auth } = require('./middlewares/auth'); */
const { errorsHandler } = require('./middlewares/errorsHandler');

const app = express();

const { PORT = 3000 } = process.env;

app.use(express.json());

app.use((req, res, next) => {
  /* req.user = {
    _id: '623be21e1a66d6363407e724',
  }; */

  req.user = {
    _id: '623eb3c11ba01d0b8b5de53f',
  };

  next();
});

mongoose.connect('mongodb://localhost:27017/bitfilmsdb');

/* app.use(auth); */

app.use(userRouter);

app.use(MovieRouter);

app.use(errorsHandler);

app.listen(PORT);
