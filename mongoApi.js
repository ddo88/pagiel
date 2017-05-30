// Load mongoose package
var mongoApi = {
}
var mongoose = require('mongoose');
// Connect to MongoDB and create/use database called todoAppTest
mongoose.connect('mongodb://nodetest:nodetest@ds030817.mlab.com:30817/alabanza');

// Create a schema
mongoApi.createSchema=function(){
    return new mongoose.Schema({
        Name: String,
        Lyrics: String,
        Chords: String,
        Type:String
    });
};
// Create a model
mongoApi.Song= mongoose.model("Song", mongoApi.createSchema());


mongoApi.db=mongoose;

module.exports=mongoApi;