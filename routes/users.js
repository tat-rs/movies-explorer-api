const express = require('express');

const {
  getUserMe,
  uptadeUserProfile,
  createUser,
} = require('../controllers/users');

const userRouter = express.Router();

userRouter.get('/users/me', getUserMe); // возвращает информацию о пользователе (email и имя)

userRouter.patch('/users/me', uptadeUserProfile); // обновляет информацию о пользователе (email и имя)

userRouter.post('/signup', createUser); // регистрация пользователя

module.exports = userRouter;
