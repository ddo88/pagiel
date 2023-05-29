var index     = require('./index.js');
var users     = require('./users.js');
var api       = require('./api.js');

module.exports = function(app) {

    app.use('/api',ensureAuthenticated,api);
    app.use('/', ensureAuthenticated,index);
    app.use('/',index);
    app.use('/users', users);


    function ensureAuthenticated(req, res, next) {
        if (req.isAuthenticated()) { return next(); }
        res.redirect('/auth/login');
    }
};