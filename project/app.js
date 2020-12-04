var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// 선언 추가
var mongodb = require('./database/mongo');
var passport = require('passport');
var passportConfig = require('./service/passport');
var session = require('express-session');
var flash = require('connect-flash');
var bodyParser = require('body-parser');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var mailRouter = require('./routes/mail');
var testRouter = require('./routes/test');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// 실행 추가
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(
  session({
    secret: 'fhjs*iu3)*#hn*(h35holaY(&*3ri3289yd#Uhgrrf78',
    resave: false,
    saveUninitialized: true,
    cookie: {
      // 하루 유지
      maxAge: 24000 * 60 * 60
    }
  }
));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passportConfig();
mongodb();


// 로그인 정보 - 페이지 전환 시 마다 passport로 인증한 값을 locals에 저장하여 같이 데이터 전송
app.use((req, res, next) => {
  if(req.user) res.locals.loginUser = req.user;
  else res.locals.loginUser = undefined;
  next();
});


// 가상경로
app.use('/css', express.static('public/stylesheets'));
app.use('/js', express.static('public/javascripts'));
app.use('/img', express.static('public/images'));
app.use('/uploadImg', express.static('public/uploads'));


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/mail', mailRouter);
app.use('/test', testRouter);

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
