const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const { errors } = require('celebrate');

const userRouter = require('./routes/users');
const MovieRouter = require('./routes/movies');
const { errorsHandler } = require('./middlewares/errorsHandler');

const app = express();

const { PORT = 3000 } = process.env;

app.use(cookieParser());

app.use(express.json());

mongoose.connect('mongodb://localhost:27017/bitfilmsdb');

app.use(userRouter);

app.use(MovieRouter);

app.use(errors());

app.use(errorsHandler);

app.listen(PORT);
