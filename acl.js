const acl = require('express-acl');

let configObject = {
    baseUrl: 'api',
    filename: 'nacl.json',
    denyCallback: (res) => {
        return res.status(403).json({
          status: 'Access Denied',
          success: false,
          message: 'You are not authorized to access this resource'
        });
      }
  };
let responseObject = {
    status: 'Access Denied',
    message: 'You are not authorized to access this resource'
  };

module.exports = function(app) {
    //acl.config(configObject, responseObject);
    //app.use(acl.authorize.unless({ path: ['/auth/google'] }));
};