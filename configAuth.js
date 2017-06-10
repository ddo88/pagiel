module.exports = {
    'googleAuth' : {
        'clientID'      : process.env.ClientID,
        'clientSecret'  : process.env.clientSecret,
        'callbackURL'   : process.env.CallbackURL || 'http://localhost:3000/oauth2callback'
    }
};