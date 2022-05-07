const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const cors = require('cors');

require('dotenv').config();

const userRouter = require('./routes/users');
const MovieRouter = require('./routes/movies');
const { errorsHandler } = require('./middlewares/errorsHandler');
const NotFoundError = require('./errors/NotFoundError');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { MONGODB_ADDRESS, PAGE_NOT_FOUND_ERR_MESSAGE } = require('./utils/constants');

const app = express();

const { PORT = 3000 } = process.env;

app.use(cookieParser());

app.use(express.json());

app.use(cors({
  origin: ['http://mesto22.nomoredomains.work', 'https://mesto22.nomoredomains.work', 'http://localhost:3000'],
  credentials: true,
}));

mongoose.connect(MONGODB_ADDRESS);

app.use(requestLogger);

app.use(userRouter);

app.use(MovieRouter);

app.use((req, res, next) => {
  next(new NotFoundError(PAGE_NOT_FOUND_ERR_MESSAGE));
});

app.use(errorLogger);

app.use(errors());

app.use(errorsHandler);

app.listen(PORT);
