
// load all the things we need
// var LocalStrategy    = require('passport-local').Strategy;
// var FacebookStrategy = require('passport-facebook').Strategy;
// var TwitterStrategy  = require('passport-twitter').Strategy;
var passport       = require('passport');
var session        = require('express-session');
var configAuth     = require('./configAuth.js');
var mongoApi       = require('./mongoApi.js');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

module.exports = function(app,passport) {

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

    // code for login (use('local-login', new LocalStategy))
    // code for signup (use('local-signup', new LocalStategy))
    // code for facebook (use('facebook', new FacebookStrategy))
    // code for twitter (use('twitter', new TwitterStrategy))

    // =========================================================================
    // GOOGLE ==================================================================
    // =========================================================================
    passport.use(new GoogleStrategy({
        clientID        : configAuth.googleAuth.clientID,
        clientSecret    : configAuth.googleAuth.clientSecret,
        callbackURL     : configAuth.googleAuth.callbackURL,},function(token, refreshToken, profile, done) {

        // make the code asynchronous
        // User.findOne won't fire until we have all our data back from Google
        process.nextTick(function() {

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
    app.use(passport.initialize());
    app.use(passport.session());

    app.get('/auth/login', (req, res, next) => {
        if (req.query.return) {
            req.session.oauth2return = req.query.return;
        }
        next();
        },
        // Start OAuth 2 flow using Passport.js
        passport.authenticate('google', { scope: ['email', 'profile'] })
    );

    app.get('/oauth2callback', passport.authenticate('google',
    {
		failureRedirect: '/auth/google'
    }),function(req,res){
         req.session.save(() => {
            var url = req.session.returnTo;
            res.redirect( url|| '/')
        });
        }
    );
};
