var express      = require('express');
var path         = require('path');
var favicon      = require('serve-favicon');
var logger       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');
var passport     = require('passport');

var index     = require('./routes/index');
var users     = require('./routes/users');
var api_users = require('./routes/api/users');
var api_songs = require('./routes/api/songs');
var api_lists = require('./routes/api/lists');
var app       = express();


// var configAuth     = require('./configAuth.js');
// var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cookieParser());
app.use(session({ 
  secret: 'keyboard cat'
  // ,key: 'sid',
  // resave: true,
  // cookie: { secure: true }})
}));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

var passportConfig = require('./passportConfig.js')(app,passport);
//passport
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));


app.use('/', ensureAuthenticated,index);
app.use('/users', users);
app.use('/api/users',ensureAuthenticated ,api_users);
app.use('/api/songs',ensureAuthenticated ,api_songs);
app.use('/api/lists',ensureAuthenticated, api_lists);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err    = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/auth/login');
}
module.exports = app;
