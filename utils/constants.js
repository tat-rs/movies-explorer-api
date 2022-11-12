const ERROR_CODE_NOCORRECT = 400;
const ERROR_UNAUTHORIZATED = 401;
const ERROR_CODE_FORBIDDEN = 403;
const ERROR_CODE_UNDEFINED = 404;
const ERROR_CODE_CONFLICT = 409;
const ERROR_CODE_DEFAULT = 500;
const SUCCESS_CODE_OK = 200;
const SUCCESS_CODE_CREATED = 201;
const ERROR_CODE_DUPLICATE = 11000;

const SOLT_ROUND = 10;

const MONGODB_ADDRESS = 'mongodb://localhost:27017/moviesdb';

const PAGE_NOT_FOUND_ERR_MESSAGE = 'Страница по указанному маршруту не найдена';

const MOVIES_NOT_FOUND_ERR_MESSAGE = 'Не найдены сохраненные фильмы';

const BAD_REQUEST_ERR_MESSAGE = 'Переданы некорректные данные';

const WRONG_ID_MOVIE_ERR_MESSAGE = 'Фильм с таким id не найден';

const FORBIDDEN_ERR_MESSAGE = 'Нельзя редактировать/удалять данные другого пользователя';

const UNAUTH_ERR_MESSAGE = 'Необходима авторизация';

const CONFLICT_ERR_MESSAGE = 'Пользователь с такой почтой уже зарегистрирован';

const WRONG_ID_USER_ERR_MESSAGE = 'Пользователь с таким id не найден';

const SIGNOUT_SUCCESS_MESSAGE = 'Пользователь вышел из системы';

const WRONG_LINK_ERR_MESSAGE = 'Введенное значение не является ссылкой';

const INCORRECT_EMAIL_ERR_MESSAGE = 'Введен некорректный email';

const WRONG_EMAIL_OR_PASSWORD_ERR_MESSAGE = 'Неправильные почта или пароль';

const INCORRECT_USER_NAME_ERR_MESSAGE = 'Имя пользователя должно содержать от 2 до 30 символов';

const MAIN_URLS = [
  'https://movie-explorer22.herokuapp.com/',
  'https://movie-explorer22.herokuapp.com',
  'https://movies-explorer-frontend-teal.vercel.app',
  'https://movies-explorer-frontend-teal.vercel.app/',
  'http://localhost:3000',
  'http://localhost:3000/',
  'http://localhost:3001',
  'http://localhost:3001/',
];

const DOMAINS = [
  '.movie-explorer22.herokuapp.com',
  '.movies-explorer-frontend-teal.vercel.app',
  '.localhost:3000',
  '.localhost:3001',
];

module.exports = {
  ERROR_CODE_NOCORRECT,
  ERROR_UNAUTHORIZATED,
  ERROR_CODE_UNDEFINED,
  ERROR_CODE_FORBIDDEN,
  ERROR_CODE_CONFLICT,
  ERROR_CODE_DEFAULT,
  SUCCESS_CODE_OK,
  SUCCESS_CODE_CREATED,
  ERROR_CODE_DUPLICATE,
  SOLT_ROUND,
  MONGODB_ADDRESS,
  PAGE_NOT_FOUND_ERR_MESSAGE,
  MOVIES_NOT_FOUND_ERR_MESSAGE,
  BAD_REQUEST_ERR_MESSAGE,
  WRONG_ID_MOVIE_ERR_MESSAGE,
  FORBIDDEN_ERR_MESSAGE,
  CONFLICT_ERR_MESSAGE,
  WRONG_ID_USER_ERR_MESSAGE,
  SIGNOUT_SUCCESS_MESSAGE,
  WRONG_LINK_ERR_MESSAGE,
  INCORRECT_EMAIL_ERR_MESSAGE,
  WRONG_EMAIL_OR_PASSWORD_ERR_MESSAGE,
  INCORRECT_USER_NAME_ERR_MESSAGE,
  UNAUTH_ERR_MESSAGE,
  MAIN_URLS,
  DOMAINS,
};
