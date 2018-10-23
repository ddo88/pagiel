module.exports = {
    'googleAuth' : {
        'clientID'      : process.env.ClientID ,
        'clientSecret'  : process.env.ClientSecret ,
        'callbackURL'   : process.env.CallbackURL || 'http://localhost:3000/oauth2callback'
    }
};