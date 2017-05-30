var express = require('express');
var router = express.Router();
var Dropbox= require('dropbox');
var _ = require('underscore');
var Promise = require('promise');
var fs = require('fs');
var mongodb= require('../mongoApi.js');

var dropboxApi = new Dropbox({ accessToken: 'rQbx2WVaCCMAAAAAAAACM1737RJ_TBS3FWn65a9YzGq39MDNqUffbxyk_kgmBBQW' });
/* GET home page. */
// router.get('/files', function(req, res, next) {
//     var path='';
//     if(req.query.path)
//         path=req.query.path;
//     getFiles(path,req,res).
//     then(function(data){ 
//         res.send(data);
//         res.end();
//     });
// });

// router.get('/readFile',function(req,res,next){
//     var path='';
//     if(req.query.path)
//         path=req.query.path;
//     getFileBlog(path,req,res).
//     then(function(data){ 
//         res.send(data);
//         res.end();
//     });
// });

// router.get('/readFile2',function(req,res,next){
//     fs.readFile('chords.json', 'utf8', function (err,data) {
//         if (err) {
//             return console.log(err);
//         }
//         res.send(JSON.parse(data));
//         console.log(data);
//         res.end();
//     });
// });

router.post('/songs',function(req,res,next){
     var item= new mongodb.Song({
        Lyrics: req.body.lyrics,
        Chords: req.body.chords,
        Name:   req.body.name,
        Type:   req.body.type
    });
    item.save(function(err,data){
                 if(err) console.log(err);
                 else 
                 res.send(data);
                 res.end();
             });
});
router.put('/songs',function(req,res,next){
    mongodb.Song.findOneAndUpdate({
        "_id":req.body.id
    },{
        Lyrics: req.body.lyrics,
        Chords: req.body.chords,
        Name:   req.body.name,
        Type:   req.body.type
    },function(err,data){
        if(err)
            res.send({error:true,message:err});
        else
            res.send(data);
        res.end();
    }) 
});
router.get('/songs', function(req, res, next) {

     mongodb.Song.find({}).sort({Name:1}).exec(function (err, songs) {
         if (err) res.send({error:true,message:err});
         else res.send(songs);
         res.end();            
     });
});

router.get('/songs/:Id', function(req, res) {
     mongodb.Song.findById(req.params.Id,function(err,data){
        if(err)
            res.send({error:true,message:err});
        else
            res.send(data);
        res.end();
    }) 
  
});

// router.get('/initmongo', function(req, res, next) {

//      fs.readFile('chords.json', 'utf8', function (err,data) {
//         if (err) {
//             return console.log(err);
//         }
//         var data=JSON.parse(data)
//         _.each(data,function(song){
//             var item= new mongodb.Song({Name: song.Name,
//                                 Lyrics: song.Lyrics,
//                                 Chords: song.Chords
//                 });
//             item.save(function(err){
//                 if(err) console.log(err);
//                 else console.log(item);
//             });
//         });

//         res.send({message:"items inserted"});
//         res.end();
        
//     });
    
// });




function getFiles(path,req,res)
{
    return new Promise(function(resolve,reject){
        dropboxApi.filesListFolder({path: path})
        .then(function(response) {
            resolve(response);
        })
        .catch(function(error) { reject(params); });
    });
}

function getFileBlog(path,req,res)
{
    return new Promise(function(resolve,reject){
        dropboxApi.filesDownload({path: path})
        .then(function(response) {
            resolve(response);
        })
        .catch(function(error) { reject(params); });
    });
}
module.exports = router;
