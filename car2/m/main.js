var mongoose = require('mongoose');

var yuangongSchema = new mongoose.Schema({
    id: Number ,
    name: String,
    tex:Number,
    dizhi:String,
    shenfen:Number,
    jiashi:String,
});
yuangongSchema.statics.findName=function(callback){
    this.find({},function(err,result){
        callback(err,result);
    });
}
yuangongSchema.statics.checkId=function(id,callback){
    this.find({"id":id},function(err,result){
        callback(result.length==0);
    });
}
yuangongSchema.statics.addYuangong=function(json,callback){
    Yuangong.checkId(json.id,function(torf){
        if(torf){
            var s=new Yuangong(json);
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
}
// yuangongSchema.statics.xiugai=function (json,callback) {
//     this.find({"id": json.id}, function (err, results) {
//         if (results.length==0) {
//             callback(-1)
//             return;
//         }
//         var thestudent = results[0];
//         thestudent.id = json.id;
//         thestudent.name = json.name;
//         thestudent.tex = json.tex;
//         thestudent.dizhi = json.dizhi;
//         thestudent.shenfen = json.shenfen;
//         thestudent.jiashi = json.jiashi;
//         console.log(thestudent)
//         thestudent.save(function (err,data) {
//             if (err) {
//                 callback(-1)
//                 return;
//             }else{
//                 callback(1)
//                 return;
//             }
//         });
//     })
// }
var Yuangong = mongoose.model("kehu",yuangongSchema);
module.exports = Yuangong;