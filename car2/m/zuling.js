var mongoose = require('mongoose');
var usert=mongoose.Schema({
    name:String,
});
var user=mongoose.model("leixing",usert);


