var mongoose = require('mongoose');
var usert= new mongoose.Schema({
    yonghuming:String,
    mima:String,
});

var user=mongoose.model("type",usert);

exports.allUser=function(yonghuming,callback){
    user.find({"yonghuming":yonghuming},function(err,doc){
        // console.log(yonghuming);
        callback(err,doc);
    });
};


