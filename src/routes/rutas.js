//var {solicitaUsuario} = require('../modelos/datos');// TEST BORRAR ... AUISDAI UDIAYGSDIYAGS

module.exports = (app, passport) => {

  app.get('/', function(req, res) {
    res.render('menu');
  });
  
  app.get('/inicioSesion', function(req, res) {
    res.render('inicia_sesion', {
      message: req.flash('loginMessage')
    });
  });

  //app.post('/inicioSesion', passport.authenticate(''));

  app.get('/registro', function(req, res) {
    res.render('Registro', {
      message: req.flash('signupMessage')
    });
  });
  
  app.post('/registro', passport.authenticate('local-signup',{
    successRedirect: '/profile',
    failureRedirect: '/registro',
    failureFlash: true,
  }));
                              //PRUEBAS
  /*                     
  app.post('/registro', (req, res, next) => {
    // FUSIONAR LAS 2
    console.log(req.body);
  });*/  

  app.get('/profile', (req, res) => {
    res.render('profile', {
      user: req.user
    });
  });

  app.get('/recupera', function(req, res) {
    res.render('RecuperarContra');
  });

};