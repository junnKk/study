//외부 모듈 추출
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
//사용자 정의 모듈 추출
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var chatRouter = require('./routes/chat');

//서버 생성
var app = express();

// view engine setup 서버에 각종 설정
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//미들 웨어 설정
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//라우터 미들 웨어 설정
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/chat', chatRouter);
app.use('/javascripts', express.static(__dirname + "/javascripts"));

// catch 404 and forward to error handler. 404 에러 예외처리
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development. 개발 중의 에러에 대한 처리
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page. 에러 페이지 렌더링 설정
  res.status(err.status || 500);
  res.render('error');
});

//모듈화
module.exports = app;










// var createError = require('http-errors');
// var express = require('express');
// var path = require('path');
// var cookieParser = require('cookie-parser');
// var logger = require('morgan');

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

// var app = express();

// // view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');

// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
// app.use('/users', usersRouter);

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

// module.exports = app;
