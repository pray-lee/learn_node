var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session')
const RedisStore = require('connect-redis')(session)
const redisClient = require('./db/redis')

const indexRouter = require('./routes/index')
const blogRouter = require('./routes/blog')
const userRouter = require('./routes/user')

var app = express();

app.use(logger('combined')); // log
app.use(express.json()); // application-json
app.use(express.urlencoded({ extended: false })); //x-www-form-urlencoded
app.use(cookieParser()); // set cookie
app.use(session({        // set session
  secret: 'Wj67_uuu',
  cookie: {   // 设置cookie配置
    path: '/',
    httpOnly: true,
    maxAge: 24*60*60*1000
  },
  store: new RedisStore({ // redis 存储
    client: redisClient
  })
}))

app.use('/', indexRouter)
app.use('/api/blog', blogRouter)
app.use('/api/user', userRouter)

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
