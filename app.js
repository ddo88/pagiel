var express      = require('express');
var path         = require('path');
var favicon      = require('serve-favicon');
var logger       = require('morgan');
var cookieParser = require('cookie-parser');
var compression  = require('compression');
var aclConfig =
require('dotenv').config();

var app          = express();

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(compression());
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


//passport
require('./passportConfig.js')(app);
//acl
require('./acl.js')(app);
//routes
require('./routes/config-routes.js')(app);


// view engine setup
app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');
app.set('view engine', 'pug');



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
  if(err.errorCode)
  {
    res.status(err.errorCode);
    res.render(err.message);  
    res.end();
  }
  else{
    res.status(err.status || 500);
    res.render('error');
  }
  
});

// function ensureAuthenticated(req, res, next) {
//   if (req.isAuthenticated()) { return next(); }
//   res.redirect('/auth/login');
// }
module.exports = app;
