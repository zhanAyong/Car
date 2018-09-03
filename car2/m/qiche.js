var mongoose = require('mongoose');

var usert=mongoose.Schema({
    id:Number,
    kuanshi:String,
    leibie:String,
    jiage:Number,
    danwei:String,
    zhuangtai:Number,
    count:String
});
usert.static.findcount=function(id,callback){
    this.find({"id":id},function(err,result){
        callback(result)
    })
}
usert.statics.Name=function(leibie,callback){
    this.find({"leibie":leibie},function(err,result){
        callback(err,result);
        // console.log(result)
    });
};
usert.statics.findId=function(id,callback){
    this.find({"id":id},function(err,result){
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
usert.statics.sousuoname=function(id,callback){
  this.find({"kuanshi":id},function(err,result){
      callback(result)
      // console.log(result)
  })
};
usert.statics.addYuangong=function(json,callback){
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

var user=mongoose.model("qiche",usert);
module.exports = user;
