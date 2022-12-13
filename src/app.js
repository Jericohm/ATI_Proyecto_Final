var createError = require('http-errors');
var express = require('express');
var app = express();

var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');
var bodyParser = require('body-parser');
var session = require('express-session');
var ejs = require('ejs');
var hbs = require('hbs');

// ANTIGUA CONEXIÓN A MONGODB
mongoose.connect('mongodb+srv://jericohm:12345@cluster1.zhnf0.mongodb.net/database?retryWrites=true&w=majority',{
  useNewUrlParser: true
}).then(()=>{
  console.log("Conectado a MongoDB")
});



const { url } = require('./config/database');

// Se solicita lo necesario para los login
require('./config/passport')(passport);


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: 'proyectoFinalATI',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//rutas
require('./routes/rutas')(app, passport);

//app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public'));

app.use(express.static(__dirname + '/public/css'));/*
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/docker',dockerRouter);
app.use('/datos', datosRouter);
app.use('/infoUser', infoUser);
app.use('/registro', registroUsuario);
app.use('/inicioSesion', iniciarSesion);
app.use('/recupera', recuperaContra);
*/

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

/*
app.listen(app.get('port'), () => {
  console.log('Servidor en puerto', app.get('port'));
});*/

//require('./routes/rutas');
//app.use('/:id', './routes/rutas'.deletePoke);

module.exports = app;
