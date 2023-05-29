var express = require('express');
var router  = express.Router();
var _       = require('lodash');
var mongodb = require('../../mongoApi.js');

router.get('/', function(req, res, next) {
     mongodb.User.find({})
     .exec(response(res));
});

function response(res){
    return function (err,data){
        if(err)
            res.send({error:true,message:err});
        else
            res.send(data);
        res.end();
    }
};

module.exports = router;
