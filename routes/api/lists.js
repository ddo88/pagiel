var express = require('express');
var router  = express.Router();
var _       = require('underscore');
var mongodb = require('../../mongoApi.js');

router.post('/',function(req,res,next){
     var obj  = getItem(req);
     var item = new mongodb.List(obj);
    item.save(response(res));
});

router.post('/history',function(req,res,next){
    mongodb.List.find({ }).limit(1).exec(function (err,data){
        var q    = _.map(data[0].Songs,function(song){
            return {id:song.id ,tono: song.tono};
        });
        var item = new mongodb.ListHistory({
            Date:new Date(),
            Songs:q
        });
        item.save(response(res));
    });
});
router.put('/history',function(req,res,next){
    mongodb.ListHistory.find({ }).skip(parseInt(req.body.pageIndex)).limit(parseInt(req.body.pageSize)).exec(response(res));
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
});

router.get('/:Id', function(req, res) {
     mongodb.List.findById(req.params.Id,response(res));
});

function getItem(req){
    var item={
        Date: new Date(),
        Songs: JSON.parse(req.body.data)
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
