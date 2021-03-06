var express      = require('express');
var path         = require('path');
var favicon      = require('serve-favicon');
var logger       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');
var passport     = require('passport');
var compression  = require('compression');
var app          = express();

app.use(compression());
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cookieParser());
app.use(session({ 
  secret: 'keyboard cat',
  // ,key: 'sid',
  resave: true
  // cookie: { secure: true }})
}));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

var passportConfig = require('./passportConfig.js')(app,passport);
var config_routes  = require('./routes/config-routes.js')(app);
var _acl            = require('./acl.js');
app.get( '/allow/', function( request, response, next ) {
        _acl.addUserRoles( request.user.id, "admin" );
        response.send(request.user.id + ' is a ' + "admin" );
    });
//passport
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

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

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/auth/login');
}
module.exports = app;
