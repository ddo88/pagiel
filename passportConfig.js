var passport       = require('passport');
var session        = require('express-session');
var configAuth     = require('./configAuth.js');
var mongoApi       = require('./mongoApi.js');
var GoogleStrategy = require('passport-google-oauth20').Strategy;

module.exports = function(app) {

    app.use(session({ 
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: true
        //,cookie: { secure: true }
      }));
    app.use(passport.initialize())
    app.use(passport.session())
    
    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        mongoApi.User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    // =========================================================================
    // GOOGLE ==================================================================
    // =========================================================================
    passport.use(new GoogleStrategy({
        clientID        : configAuth.googleAuth.clientID,
        clientSecret    : configAuth.googleAuth.clientSecret,
        callbackURL     : configAuth.googleAuth.callbackURL,
        },
        function(token, refreshToken, profile, done) {
            console.log(profile)
        // make the code asynchronous
        // User.findOne won't fire until we have all our data back from Google
        process.nextTick(function() {
            console.log(profile.id)
            // try to find the user based on their google id
            mongoApi.User.findOne({ 'google.id' : profile.id }, function(err, user) {
                if (err)
                    return done(err);
                
                if (user) {

                    // if a user is found, log them in
                    return done(null, user);
                } else {
                    // if the user isnt in our database, create a new user
                    var newUser          = new mongoApi.User();

                    // set all of the relevant information
                    newUser.google.id    = profile.id;
                    newUser.google.token = token;
                    newUser.google.name  = profile.displayName;
                    newUser.google.email = profile.emails[0].value; // pull the first email

                    // save the user
                    newUser.save(function(err) {
                        if (err)
                            throw err;
                        return done(null, newUser);
                    });
                }
            });
        });

    }));

    app.get('/auth/login', (req, res, next) => {
        passport.authenticate('google', { scope: ['email', 'profile'] })(req, res, next);
    });

    app.get('/oauth2callback', passport.authenticate('google',
    {
		failureRedirect: '/auth/google'
    }),function(req,res){
         req.session.save(() => {
            var url = req.session.returnTo;
            res.redirect( url|| '/')
        });
    });
};
