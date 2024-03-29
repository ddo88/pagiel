// Load mongoose package
var mongoApi = {
}
var mongoose = require('mongoose');
//mongoose.set('toObject', { virtuals: true });
mongoose.set('toJSON', { virtuals: true });
// Connect to MongoDB and create/use database called todoAppTest
mongoose.connect( process.env.MongoConnectionString, { useNewUrlParser: true, useUnifiedTopology:true });
//demo

// Create a schema
mongoApi.createSchemaUser        = function(){
    return new mongoose.Schema({
        google: {
            id:String,
            token:String,
            name :String,
            email:String
        }
    });
    };
mongoApi.createSchemaSong        = function(){
    return new mongoose.Schema({
        Name: String,
        Lyrics: String,
        Chords: String,
        ChordsGuitar: String,
        ChordsBass: String,
        Type:String,
        Views:Number
    });
    };
mongoApi.createSchemaList        = function(){
    return new mongoose.Schema({
        Date: Date,
        // Songs:[{
        //     ids:String
        // }]
        Songs:[{
            id:String,
            tono:Number
        }]
    });
    };
mongoApi.createSchemaListHistory = function(){
    return new mongoose.Schema({
        Date: Date,
        Songs:[{
            id:String,
            tono:Number
        }]
    });
};
// Create a model
mongoApi.Song        = mongoose.model("Song",       mongoApi.createSchemaSong());
mongoApi.List        = mongoose.model("List",       mongoApi.createSchemaList());
mongoApi.ListHistory = mongoose.model("ListHistory",mongoApi.createSchemaList());
mongoApi.User        = mongoose.model("User",       mongoApi.createSchemaUser());

mongoApi.db=mongoose;

module.exports=mongoApi;