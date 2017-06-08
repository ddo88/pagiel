// Load mongoose package
var mongoApi = {
}
var mongoose = require('mongoose');
// Connect to MongoDB and create/use database called todoAppTest
mongoose.connect('mongodb://nodetest:nodetest@ds030817.mlab.com:30817/alabanza');
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