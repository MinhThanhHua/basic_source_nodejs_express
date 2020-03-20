'use strict';

// Import package from npm
import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import handlebars from 'express-handlebars';

// Import package from source code
import indexRouter from './routes/index';
// Set global
import constant from './config/constant';

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));

app.use('/', indexRouter);

// Set view template engine for app
app.set('views', __dirname + '/views');
app.engine('hbs', handlebars({
  defaultLayout: 'front',
  extname: '.hbs',
  layoutsDir: path.join(__dirname, 'views/layouts'),
  helpers: require('./views/helpers/blocks').helpers(),// load view helper
  partialsDir: __dirname + '/views/element/' // load partial view
}));
app.set('view engine', 'hbs');

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

export default app;
// module.exports = exports['default'];
