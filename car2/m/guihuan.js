var mongoose = require('mongoose');

var usert=mongoose.Schema({
    id:Number,
    name:String,
    leibie:String,
    day:Number,
    zujin:String,
    yajin:Number,
    zhuangtai:Number,
    time:Date,
    guanliyuan:String
});

usert.statics.checkId=function(id,callback){
    this.find({"id":id},function(err,result){
        callback(result.length==0);
        // console.log(result)
    });
};
usert.statics.addGuihuan=function(json,callback){
    user.checkId(json.id,function(torf){
        if(torf){
            var s=new user(json);
            s.save(function(err){
                if(err){
                    callback(-2);
                    return;
                }
                callback(1);
            })
        }else{
            callback(-1);
        }
    })
};

var user=mongoose.model("guihuan",usert);
module.exports = user;
