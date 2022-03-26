const express = require('express');

const {
  getUserMe,
  uptadeUserProfile,
  createUser,
  login,
  signout,
} = require('../controllers/users');
const { auth } = require('../middlewares/auth');

const userRouter = express.Router();

userRouter.post('/signup', createUser); // регистрация пользователя

userRouter.post('/signin', login); // вход пользователя в профиль

userRouter.use(auth);

userRouter.get('/users/me', getUserMe); // возвращает информацию о пользователе (email и имя)

userRouter.patch('/users/me', uptadeUserProfile); // обновляет информацию о пользователе (email и имя)

userRouter.post('/signout', signout); // выход пользователя из системы

module.exports = userRouter;
