var express = require('express');
var router = express.Router();
// var Dropbox= require('dropbox');
// var _ = require('underscore');
// var Promise = require('promise');
// var fs = require('fs');
var mongodb= require('../../mongoApi.js');

//var dropboxApi = new Dropbox({ accessToken: 'rQbx2WVaCCMAAAAAAAACM1737RJ_TBS3FWn65a9YzGq39MDNqUffbxyk_kgmBBQW' });

router.post('/',function(req,res,next){
     var obj=getItem(req);
         obj.Views=0;
     var item= new mongodb.Song(obj);
    item.save(response(res));
});
router.put('/',function(req,res,next){
    var updateItem=getItem(req);
    if(req.body.views)
        updateItem.Views=req.body.views;
    mongodb.Song.findOneAndUpdate({"_id":req.body.id},updateItem,response(res)) 
});
router.get('/', function(req, res, next) {
     mongodb.Song.find({}).sort({Name:1}).exec(response(res));
});
router.get('/:Id', function(req, res) {
     mongodb.Song.findById(req.params.Id,response(res));
});

function getItem(req){
    return {
        Lyrics: req.body.lyrics,
        Chords: req.body.chords,
        Name:   req.body.name,
        Type:   req.body.type
    }
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
