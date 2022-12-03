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

    /*                   
  app.post('/inicioSesion', (req, res) => {
    // FUSIONAR LAS 2
    console.log(req.body);
  });*/

  app.post('/inicioSesion', passport.authenticate('local-login',{
    successRedirect: '/profile',
    failureRedirect: '/inicioSesion',
    failureFlash: true,
  }))

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

  app.get('/profile', isLoggedIn, (req, res) => {
    res.render('profile', {
      user: req.user
    });
  });

  app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });

  app.get('/recupera', function(req, res) {
    res.render('RecuperarContra');
  });

  function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
      return next();
    }
    return res.redirect('/');
  };
};