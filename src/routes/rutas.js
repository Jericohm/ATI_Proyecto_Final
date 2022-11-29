module.exports = (app, passport) => {

  app.get('/', function(req, res) {
    res.render('menu');
  });
  
  app.get('/inicioSesion', function(req, res) {
    res.render('inicia_sesion');
  });

  app.get('/registro', function(req, res) {
    res.render('Registro');
  });

  app.get('/recupera', function(req, res) {
    res.render('RecuperarContra');
  });

  
}