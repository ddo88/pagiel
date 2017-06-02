var express = require('express');
var router = express.Router();
// var Dropbox= require('dropbox');
var _ = require('underscore');
// var Promise = require('promise');
// var fs = require('fs');
var mongodb= require('../../mongoApi.js');

//var dropboxApi = new Dropbox({ accessToken: 'rQbx2WVaCCMAAAAAAAACM1737RJ_TBS3FWn65a9YzGq39MDNqUffbxyk_kgmBBQW' });

router.post('/',function(req,res,next){
     var obj=getItem(req);
     var item= new mongodb.List(obj);
    item.save(response(res));
});
router.put('/',function(req,res,next){
    var updateItem=getItem(req);
    mongodb.List.findOneAndUpdate({"_id":req.body.id},updateItem,response(res)) 
});

router.get('/', function(req, res, next) {
     mongodb.List.find({}).sort({Name:1}).exec(response(res));
});
router.get('/current',function(req,res,next){
    mongodb.List.find({ }).limit(1).exec(response(res));
})
router.get('/:Id', function(req, res) {
     mongodb.List.findById(req.params.Id,response(res));
});

function getItem(req){
    var item={
        Date: new Date(),
        Songs: req.body.ids.split(',')
    };
    return item;
}
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
