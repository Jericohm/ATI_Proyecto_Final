var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('Registro');
});

/*
router.get('/intro', function(req, res, next) {
  res.render('docker/PaginaIntro/Intro',{regr:'/users',regr:'/docker'});
});
*/


module.exports = router;
