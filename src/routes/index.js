var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
  res.render('menu.html',{logo:'Logo.jpg',regr:'/users',regr1:'/docker',regr2:'/datos'});
});



//GET home page. 
/*
router.get('/', function(req, res, next) {
  res.render('menu',{logo:'Logo.jpg',regr:'/registro',regr1:'/inicioSesion',regr2:'/recupera'});
});

*/
module.exports = router;