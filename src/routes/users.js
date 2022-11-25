var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('users',{style:'styleUsers.css', img:'DJHM.jpg', img1:'FMH.jpg',
  img2:'AGM.jpg',img3:'difh.jpg',img4:'HJP.jpg',img5:'JACR.jpg',img6:'MTJS.jpg',
  img7:'LMVO.jpg',img8:'JMRR.jpg',jerico:'/users/jerico', fernan:'/users/fernando'
  ,alan:'/users/alan',dana:'/users/dana', hassel:'/users/hassel',javier:'/users/javier',
  maria:'/users/maria',jose:'/users/jose',luis:'/users/luis',regr:'/'});
});

router.get('/jerico', function(req, res, next) {
  res.render('equipo/PaginaDJHM/jerico',{style:'styleJerico.css', img:'DJHM.jpg',regr:'/users'});
});

router.get('/alan', function(req, res, next) {
  res.render('equipo/PaginaAGM/Alan',{style:'styleAlan.css', img:'AGM.jpg',regr:'/users'});
});

router.get('/dana', function(req, res, next) {
  res.render('equipo/PaginaDIFH/DanaItzelFonsecaHernandez',{style:'styleDana.css', img:'difh.jpg',regr:'/users'});
});

router.get('/fernando', function(req, res, next) {
  res.render('equipo/PaginaFMH/fernan',{style:'styleFernan.css', img:'FMH.jpg',regr:'/users'});
});

router.get('/hassel', function(req, res, next) {
  res.render('equipo/PaginaHJP/hassel',{style:'styleHassel.css', img:'HJP.jpg',regr:'/users'});
});

router.get('/javier', function(req, res, next) {
  res.render('equipo/PaginaJACR/javier',{style:'styleJavier.css', img:'JACR.jpg',regr:'/users'});
});

router.get('/maria', function(req, res, next) {
  res.render('equipo/PaginaMTJS/maria',{style:'styleTere.css', img:'MTJS.jpg',regr:'/users'});
});

router.get('/jose', function(req, res, next) {
  res.render('equipo/PaginaJMRR/jose',{style:'styleJose.css', img:'JMRR.jpg',regr:'/users'});
});

router.get('/luis', function(req, res, next) {
  res.render('equipo/PaginaLMVO/luis',{style:'styleLuis.css', img:'LMVO.jpg',regr:'/users'});
});
module.exports = router;
