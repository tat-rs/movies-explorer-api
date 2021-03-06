const express = require('express');

const {
  getUserMe,
  uptadeUserProfile,
  createUser,
  login,
  signout,
} = require('../controllers/users');
const { auth } = require('../middlewares/auth');
const { validateRegister, validateLogin, validateUptadeProfile } = require('../middlewares/validation');

const userRouter = express.Router();

userRouter.post('/signup', validateRegister, createUser); // регистрация пользователя

userRouter.post('/signin', validateLogin, login); // вход пользователя в профиль

userRouter.use(auth);

userRouter.get('/users/me', getUserMe); // возвращает информацию о пользователе (email и имя)

userRouter.patch('/users/me', validateUptadeProfile, uptadeUserProfile); // обновляет информацию о пользователе (email и имя)

userRouter.post('/signout', signout); // выход пользователя из системы

module.exports = userRouter;
