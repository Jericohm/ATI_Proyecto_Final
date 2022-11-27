var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');

mongoose.connect('mongodb+srv://jericohm:12345@cluster1.zhnf0.mongodb.net/database?retryWrites=true&w=majority',{
  useNewUrlParser: true
}).then(()=>{
  console.log("Conectado a MongoDB")
});


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var dockerRouter=require('./routes/docker');
var datosRouter = require('./routes/datos');
var infoUser = require('./routes/infoUsers');
var registroUsuario = require('./routes/registro');
var iniciarSesion = require('./routes/iniciarSesion');
var recuperaContra = require('./routes/recuperar');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public'));
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/docker',dockerRouter);
app.use('/datos', datosRouter);
app.use('/infoUser', infoUser);
app.use('/registro', registroUsuario);
app.use('/inicioSesion', iniciarSesion);
app.use('/recupera', recuperaContra);
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
