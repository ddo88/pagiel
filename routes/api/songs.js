var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var response= require('../../core.js').response;
var _ = require('underscore');

var mongodb= require('../../mongoApi.js');

//var dropboxApi = new Dropbox({ accessToken: 'rQbx2WVaCCMAAAAAAAACM1737RJ_TBS3FWn65a9YzGq39MDNqUffbxyk_kgmBBQW' });
router.get('/', function(req, res, next) {
     mongodb.Song.find({}).sort({Name:1}).exec(response(res));
});
// router.get('/all', function(req, res, next) {
//     mongodb.Song.update({},{Views:0},{multi:true},response(res));
// });
router.get('/details',function(req,res,next){
    var ord=parseInt(req.query.order||1);
    mongodb.Song.find({}).sort({Views:ord}).limit(5).exec(response(res));
});
router.get('/:Id', function(req, res) {
     mongodb.Song.findById(req.params.Id,response(res));
});

router.post('/search', function(req, res){
    var _ids=_.map(req.body.ids.split(','),function(o){
        return mongoose.Types.ObjectId(o); 
    });
    mongodb.Song.find({"_id":{$in: _ids  }},response(res));
});


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
router.put('/:Id', function(req, res) {
     mongodb.Song.findOneAndUpdate({"_id":req.params.Id},{ $inc: { "Views" : 1 } },response(res));
});

function getItem(req){
    return {
        Lyrics: req.body.lyrics,
        Chords: req.body.chords,
        Name:   req.body.name,
        Type:   req.body.type
    }
}

module.exports = router;