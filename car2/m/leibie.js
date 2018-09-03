var mongoose = require('mongoose');

var usert=mongoose.Schema({
    id:Number,
    name:String
});

usert.statics.findName=function(name,callback){
    this.find({"name":name},function(err,result){
        callback(err,result);
        // console.log(result)
    });
};
usert.statics.checkId=function(id,callback){
    this.find({"id":id},function(err,result){
        callback(result.length==0);
        // console.log(result)
    });
};
usert.statics.addYuangong=function(json,callback){
    // console.log(json)
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

var user=mongoose.model("leibie",usert);
module.exports = user;
