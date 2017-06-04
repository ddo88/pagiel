var express = require('express');
var router = express.Router();
//var passport=require('passport');
// var configAuth=require('./configAuth.js');
// var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

/* GET home page. */
router.get('/',function(req,res,next){
  res.redirect('/presentation');
  //res.render('index',{});
})
router.get('/songs', function(req, res, next) {
  res.render('songs', { title: 'Canciones' });
});

router.get('/list', function(req, res, next) {
  res.render('list', { title: 'Lista' });
});

router.get('/presentation', function(req, res, next) {
  res.render('presentation', { title: 'List' });
});

router.get('/presentationChords', function(req, res, next) {
  res.render('presentationChords', { title: 'Notas' });
});

module.exports = router;
