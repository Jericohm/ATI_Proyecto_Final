var express = require('express');
const passport = require('../config/passport');
var router = express.Router();


module.exports = (app, passport) => {

  app.get('/', function(req, res, next) {
    res.render('inicia_sesion');
  });
  
}

  






/*
var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('inicia_sesion',{regr:'../registro',regr1:'../inicioSesion',regr2:'../recupera',
img:'logoPKB.png'});
});

module.exports = router;
*/