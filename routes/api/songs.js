var express  = require('express');
var router   = express.Router();
var mongoose = require('mongoose');
var response = require('../../core.js').response;
var _        = require('lodash');

var mongodb= require('../../mongoApi.js');


router.get('/', function(req, res, next) {
    debugger;
    var q =mongodb.Song.find({} ,"Name Lyrics Chords ChordsGuitar ChordsBass Type Views",response(res));
});

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
        ChordsGuitar : req.body.chordsGuitar,
        ChordsBass : req.body.chordsBass,
        Name:   req.body.name,
        Type:   req.body.type
    }
}
module.exports = router;