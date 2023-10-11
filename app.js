const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const compression = require('compression');
const session = require('express-session');
const redisClient = require('./redis/redisClient')
const RedisStore = require('connect-redis').default;
const dotenv = require('dotenv');
const passport = require('passport');

dotenv.config(); // process.env 생성

const passportConfig = require('./passport');
const sequelize = require('./models').sequelize;
const config = require('./config/config.json')[process.env.NODE_ENV || 'development'];
// const viewPath = config.path;
const cors = require('cors');
const history = require('connect-history-api-fallback');
const MySQLStore = require('express-mysql-session')(session);

const app = express();
sequelize.sync();
passportConfig();

// if(process.env.NODE_ENV === 'production') {
//   app.use('/', express.static(path.join(__dirname, viewPath.index)));
// } else{
//   app.use('/', express.static(path.join(__dirname, viewPath.index)));
// }

const sessionStore = new MySQLStore({
  host: config.db.host,
  port: config.db.port,
  user: config.db.username,
  password: config.db.password,
  database: config.db.database
});

app.use(logger('dev'));
app.use(express.json()); // req.body를 ajax json 요청으로 부터
app.use(express.urlencoded({ extended: false })); // req.body 폼으로 부터 
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true,
    secure: true,
    maxAge: 7 * 24 * 60 * 60 * 1000, //7일 - maxAge 설정 시 브라우저를 모두 닫아도 로그인 유지 됨
    // maxAge 설정해제시 세션 쿠키가 되어서 브라우저 종료 시 로그인 해제함
  },
  store: new RedisStore({ client: redisClient }),
}));
app.use(passport.initialize()); // req.use, req.login, req.isAuthenticate, req.logout
app.use(passport.session()); // connect.sid라는 이름으로 세션 쿠키가 브라우저로 전송 

app.use(compression());

app.use('/', require('./routes'));
console.log("<<<<<");
console.log(1);
app.use(history());


// view engine setup
app.set('views', path.join(__dirname, 'views'));
console.log(2);
app.set('view engine', 'pug');

console.log(3);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;