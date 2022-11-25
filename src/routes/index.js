var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index',{logo:'Logo.jpg',regr:'/users',regr1:'/docker',regr2:'/datos'});
});

module.exports = router;
