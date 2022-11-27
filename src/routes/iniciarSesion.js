var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('inicia_sesion',{regr:'../registro',regr1:'../inicioSesion',regr2:'../recupera',
img:'logoPKB.png'});
});

/*
router.get('/intro', function(req, res, next) {
  res.render('docker/PaginaIntro/Intro',{regr:'/users',regr:'/docker'});
});
*/
module.exports = router;
