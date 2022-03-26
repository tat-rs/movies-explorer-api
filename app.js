const express = require('express');
const mongoose = require('mongoose');

const userRouter = require('./routes/users');
const MovieRouter = require('./routes/movies');

const app = express();

const { PORT = 3000 } = process.env;

app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: '623be21e1a66d6363407e724',
  };

  next();
});

mongoose.connect('mongodb://localhost:27017/bitfilmsdb');

app.use(userRouter);

app.use(MovieRouter);

app.listen(PORT);
