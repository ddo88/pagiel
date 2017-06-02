var express = require('express');
var router = express.Router();
//var passport=require('passport');
// var configAuth=require('./configAuth.js');
// var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/List', function(req, res, next) {
  res.render('list', { title: 'List' });
});

router.get('/presentation', function(req, res, next) {
  res.render('presentation', { title: 'List' });
});

module.exports = router;
