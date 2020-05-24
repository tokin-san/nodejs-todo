var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// 環境設定ファイルの存在チェック
const env = require('dotenv').config();
if (env.error) {
    throw env.error;
}
if (process.env.APP_TOKEN === undefined || process.env.APP_SALT === undefined) {
    throw new Error('Require environment keyword Not Found.');
}

var indexRouter = require('./routes/index');
var apiRouter = require('./routes/api');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// tokenチェック
const tokenUtil = require('./lib/utils/token_util')
app.use(function(req, res, next) {
    const requestToken = req.headers['app-token'];
    if (!requestToken || !tokenUtil.check(requestToken)) {
        next(createError(404));
    }
    next();
});

app.use('/', indexRouter);
app.use('/api', apiRouter);

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
