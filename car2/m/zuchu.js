var mongoose = require('mongoose');

var usert=mongoose.Schema({
    id:Number,
    name:String,
    leibie:String,
    day:Number,
    zujin:Number,
    yajin:Number,
    zhuangtai:Number,
    time:Date,
    guanliyuan:String
});
usert.statics.checkId=function(id,callback){
    this.find({"id":id},function(err,result){
        callback(result.length==0);
    });
}
usert.statics.addzuche=function(json,callback){
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
usert.statics.findleibie=function(id,callback){
  this.find({"liebie":id},function(err,result){
       callback(result);
  })
};

var user=mongoose.model("zuchu",usert);
module.exports = user;
