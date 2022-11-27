var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('RecuperarContra',{regr:'/registro',regr1:'/inicioSesion',regr2:'/recupera'});
});

module.exports = router;