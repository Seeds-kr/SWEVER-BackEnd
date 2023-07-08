var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var compression = require('compression');

var sequelize = require('./models').sequelize;
const config = require('./config/config.json')[process.env.NODE_ENV || 'development'];
// const viewPath = config.path;
const cors = require('cors');
const session = require('express-session');
const history = require('connect-history-api-fallback');
const MySQLStore = require('express-mysql-session')(session);

var app = express();
sequelize.sync();

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

app.use(compression());

app.use('/', require('./routes'));
console.log("<<<<<");
console.log(1);
app.use(history());


// view engine setup
app.set('views', path.join(__dirname, 'views'));
console.log(2);
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

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
