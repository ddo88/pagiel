var express = require('express');
var mongoose = require('mongoose');
var router  = express.Router();
var _       = require('underscore');
var mongodb = require('../../mongoApi.js');
var response= require('../../core.js').response;
var For= require('../../core.js').For;

/* get */
router.get('/', function(req, res, next) {
     mongodb.List.find({}).sort({Name:1}).exec(response(res));
 });
router.get('/current',function(req,res,next){
    mongodb.List.find({ }).limit(1).exec(response(res));
 });
router.get('/songs',function(req,res,next){
    var props=null;
    if(req.query.properties)
    {
        props=req.query.properties.split(',').join(" ");
    }
    

    mongodb.List.find({ }).limit(1).exec(function(err,data){
        if(err)
            res.send({error:true,message:err});
        else
        {
            /*
            var q=_.map(list.aditionalData[0].Songs,function(i){return {id:i.id, tono:i.tono}; });
           For(_.map(list.data,function(i){ 
                var t  = _.filter(q,function(item){ return item.id==i["_id"];}); 
                i.tono = t && t.length && t[0].tono;
                return i
            }),function(d){
                var song=new Song(d,_self);
                _self.files.push(song);
            });
             */
            var c=_.map(data[0].Songs,function(i){ return i.id; });
            var q=_.map(data[0].Songs,function(i){return {id:i.id, tono:i.tono}; });
            var _ids=_.map(c,function(o){ return mongoose.Types.ObjectId(o); });
            //mongodb.Song.find({"_id":{$in: _ids  }},response(res));
            if(props)
                mongodb.Song.find({"_id":{$in: _ids  }},props,function (err,data2){
                    if(err)
                        res.send({error:true,message:err});
                    else
                    {
                        data2 = JSON.parse(JSON.stringify(data2))
                        For(data2,function(song){
                                var t  = _.filter(q,function(item){ return item.id==song["_id"];}); 
                                song.tono = t && t.length && t[0].tono;
                        });
                        res.send(data2);
                    }
                    
                    res.end();
                });
            else
                mongodb.Song.find({"_id":{$in: _ids  }},response(res));
        }
    });
 });

router.get('/:Id', function(req, res) {
     mongodb.List.findById(req.params.Id,response(res));
});

/* post */
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
/* put */
router.put('/history',function(req,res,next){
    mongodb.ListHistory.find({ }).skip(parseInt(req.body.pageIndex)).limit(parseInt(req.body.pageSize)).exec(response(res));
 });
router.put('/',function(req,res,next){
    var updateItem=getItem(req);
    mongodb.List.findOneAndUpdate({"_id":req.body.id},updateItem,response(res)) 
});


function getItem (req){
    var item={
        Date: new Date(),
        Songs: JSON.parse(req.body.data)
    };
    return item;
 }

module.exports = router;
