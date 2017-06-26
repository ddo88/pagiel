var acl            = require('acl'),
    mongoApi       = require('./mongoApi.js'),
    prefix          ="_acl",
    _acl = new acl(new acl.mongodbBackend(mongoApi.db.connection.db, prefix));
    
_acl.allow([{
                roles: ['guest'],
                allows: [
                    { resources: '/auth/login', permissions: 'get' },
                    { resources: '/api/lists/',   permissions: 'get' },
                    { resources: '/api/songs',   permissions: 'get' }
                    ],
                },
                {
                roles: ['admin'],
                allows: [
                    { resources: '/api/lists/history', permissions: 'post' }
                    ]
                },
            ]);
_acl.getUserId=function(req, res){
    userId=req.user.id;
    return(userId)
}    
module.exports = _acl;