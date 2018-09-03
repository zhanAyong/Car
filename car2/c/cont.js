var formidable = require("formidable");
var user = require("../m/user.js");
var leibie = require("../m/leibie.js");
var main = require("../m/main");
var qiche = require("../m/qiche.js");
var zuchu = require("../m/zuchu.js");
var guihuan = require("../m/guihuan.js");
var crypto = require('crypto');
var url = require("url");

<!--       进入登陆页        -->
exports.Inlogin = function (req, res) {
    res.render("login.ejs");
};
// 检测是否登录成功
exports.checklogin = function (req, res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {

        var yonghuming = fields.yonghuming;
        var mima = fields.mima;
        user.allUser(yonghuming, function (err, doc) {
            // console.log(doc)
            if (doc.length == 0) {
                res.json({"result": -1});
                return;
            }
            if (crypto.createHmac("sha256", mima).digest("hex") === doc[0].mima) {
                req.session.login = 1;
                req.session.yonghuming = yonghuming;
                res.json({"result": 1});
                return;
            } else {
                res.json({"result": -2});
                return;
            }
        })
    })
};


<!--        进入客户管理页面        -->
exports.showIndex = function (req, res) {
    res.render("index", {
        "result": req.session.yonghuming
    });
};
//得到客户名字
exports.findName = function (req, res) {
    main.findName(function (err, result) {
        // console.log(result);
        res.json({
            "ddd": result
        });
    })
};
// 得到所有客户
exports.getAllyuangong = function (req, res) {
    var page = url.parse(req.url, true).query.page - 1 || 0;
    var pagesize = 5;
    main.count({}, function (err, count) {
        main.find({}).limit(pagesize).skip(pagesize * page).exec(function (err, result) {
            res.json({
                "pageAmount": Math.ceil(count / pagesize),
                "result": result
            })
        })
    })
}
// 行号检测
exports.check = function (req, res) {
    var id = req.params.id;
    main.checkId(id, function (torf) {
        res.json({"result": torf});
    })
}
//添加用户
exports.doAddyuangong = function (req, res) {
    console.log("服务器收到了一个POST请求");
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        main.addYuangong(fields, function (result) {
            res.json({"result": result});
        });
    });
}
// 修改客户
exports.updateYuangong = function (req, res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        main.xiugai(fields,function (err,data) {

        })
    })
};
exports.updateYuangong=function (req,res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields) {
        main.find({"id":fields.id},function (err,data) {
            if (data.length==0){
                res.json({"s":-1});
            }
            var result = data[0];
            result.id = fields.id;
            result.name = fields.name;
            result.tex = fields.tex;
            result.dizhi = fields.dizhi;
            result.shenfen = fields.shenfen;
            result.jiashi = fields.jiashi;
            var result=new main(result)
            result.save(function (err,data) {
                if (err){
                    res.json({"s":-1})
                    return;
                }
                res.json({"s":1})
                return;
            })
        })
    })
};

//客户修改
exports.detailed = function (req, res) {
    var id = req.params.id;
    main.find({"id": id}, function (err, results) {
        if (err || results.length == 0) {
            res.json({"s": -1});
            return;
        }
        res.json({"s": results[0]})
    })
};

//客户删除
exports.deleteYuangong = function (req, res) {
    //拿到学号
    var id = req.params.id;
    //寻找这个学号的学生
    main.find({"id": id}, function (err, results) {

        if (err || results.length == 0) {
            res.json({"result": -1});
            return;
        }
        //删除
        results[0].remove(function (err) {
            if (err) {
                res.json({"result": -1});
                return;
            }
            res.json({"result": 1});
        });
    });
};


<!--        进入租赁登记        -->
exports.showZuling = function (req, res) {
    res.render("zuling.ejs", {
        "result": req.session.yonghuming
    });
};
exports.zulingFindqiche = function (req, res) {
    var page = url.parse(req.url, true).query.page - 1 || 0;
    var pagesize = 5;
    qiche.count({}, function (err, count) {
        qiche.find({}).limit(pagesize).skip(pagesize * page).exec(function (err, result) {
            res.json({
                "pagezuling": Math.ceil(count / pagesize),
                "data": result
            })
        })
    })
};
exports.zulingFindleixing = function (req, res) {
    leibie.find({}, function (err, result) {
        res.json({
            "result": result
        })
    })
};
exports.xuanze = function (req, res) {
    var name = req.params.name;
    // console.log(name)
    leibie.findName(name, function (err, result) {
        // console.log(result)
        var arr = result[0].name;
        qiche.Name(arr, function (err, result) {
            res.json({
                "doc": result
            })
        })
    })
};
//点击单选按钮
exports.dianzhong = function (req, res) {
    var id = req.params.id;
    qiche.findId(id, function (err, result) {
        // console.log()
        res.json({
            "qian": result
        })
    })
};
//存储租出的信息
exports.zuchu = function (req, res) {
    console.log("服务器收到了一个POST请求");
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        zuchu.addzuche(fields, function (result) {
            res.json({"result": result});

        });
        // console.log(fields.id)

    });
};
exports.hhh = function (req, res) {
    var id = req.params.id;
    // console.log(id);
    qiche.find({"id": id}, function (err, results) {
        if (results.length == 0) {
            res.json({"result": -1});
            return;
        }
        var thestudent = results[0];
        console.log(results[0].count)
        var cont = parseInt(results[0].count);
        cont++;
        thestudent.id = thestudent.id;
        thestudent.kuanshi = thestudent.kuanshi;
        thestudent.leibie = thestudent.leibie;
        thestudent.jiage = thestudent.jiage;
        thestudent.danwei = thestudent.danwei;
        thestudent.zhuangtai = 1;
        thestudent.count = cont;



        thestudent.save(function (err) {
            if (err) {
                res.json({"result": -1});
            } else {
                res.json({"result": 1});
            }
        });
    })
};


<!--    进入归还登记    -->
exports.showGuihuan = function (req, res) {
    res.render("guihuan.ejs", {
        "result": req.session.yonghuming
    });
};
// 租出的所有数据的渲染
exports.guihuanData = function (req, res) {
    var page = url.parse(req.url, true).query.page - 1 || 0;
    var pagesize = 5;
    zuchu.count({}, function (err, count) {
        zuchu.find({}).limit(pagesize).skip(pagesize * page).exec(function (err, result) {
            res.json({
                "pageguihuan": Math.ceil(count / pagesize),
                "data": result
            })
        })
    })
};
// 归还后改变库里的状态值
exports.guihuanall = function (req, res) {
    var sid = req.params.id;
    qiche.find({"id": sid}, function (err, results) {
        if (results.length == 0) {
            res.json({"result": -1});
            return;
        }
        var thestudent = results[0];

        thestudent.id = thestudent.id;
        thestudent.kuanshi = thestudent.kuanshi;
        thestudent.leibie = thestudent.leibie;
        thestudent.jiage = thestudent.jiage;
        thestudent.danwei = thestudent.danwei;
        thestudent.zhuangtai = 0;
        thestudent.count = thestudent.count;


        thestudent.save(function (err) {
            if (err) {
                res.json({"result": -1});
            } else {
                res.json({"result": 1});
            }
        });
    })
};
//删除库里的东西
exports.guihuandele = function (req, res) {
    var id = req.params.id;
    zuchu.find({"id": id}, function (err, results) {
// console.log(results)
        if (err || results.length == 0) {
            res.json({"result": -1});
            return;
        }
        //删除
        results[0].remove(function (err) {
            if (err) {
                res.json({"result": -1});
                return;
            }
            res.json({"result": 1});
        });
    });
};
//存储归还的数据
exports.guihuanTongji = function (req, res) {
    console.log("服务器收到了一个POST请求");
    // zuchu.findleibie();
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        guihuan.addGuihuan(fields, function (result) {
            // console.log(result);
            res.json({"result": result});
        });
    });
};


<!--    进入统计分析    -->
exports.showTongji = function (req, res) {
    res.render("tongji.ejs", {
        "result": req.session.yonghuming
    });
};
exports.tongjizuchu = function (req, res) {
    zuchu.count({}, function (err, data) {
        // console.log(data);
        zuchu.find({}, function (err, result) {
            // console.log(result)
            res.json({
                "result": result,
            });
        })
    })
};
exports.tongjiguihuan = function (req, res) {
    guihuan.count({}, function (err, data) {
        // console.log(data);
        guihuan.find({}, function (err, result) {
            // console.log(result)
            res.json({
                "result": result,
            })
        })
    })
};


<!--   进入类别档案      -->
exports.showLeibie = function (req, res) {
    res.render("leibie.ejs", {
        "result": req.session.yonghuming
    });
};
// 得到所有类型
exports.leibiegetAllyuangong = function (req, res) {
    var page = url.parse(req.url, true).query.page - 1 || 0;
    var pagesize = 5;
    leibie.count({}, function (err, count) {
        // console.log(count);
        leibie.find({}).limit(pagesize).skip(pagesize * page).exec(function (err, result) {
            res.json({
                "page": Math.ceil(count / pagesize),
                "result": result
            })
        })
    })
};
exports.all=function(req,res){
    leibie.find({},function(err,result){
        // console.log(result)
        res.json({
            "result":result
        })
    })
}
// 行号检测
exports.leibiecheck = function (req, res) {
    var id = req.params.id;
    leibie.checkId(id, function (torf) {
        res.json({"result": torf});
    })
}

exports.leibiedoAddyuangong = function (req, res) {
    console.log("服务器收到了一个POST请求");
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        leibie.addYuangong(fields, function (result) {
            res.json({"result": result});
        });
    });
}
// 添加类型
exports.leibieupdateYuangong = function (req, res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        // console.log(fields)
        leibie.find({"id": fields.id}, function (err, results) {
            if (results.length == 0) {
                res.json({"result": -1});
                return;
            }
            var thestudent = results[0];

            thestudent.id = fields.id;
            thestudent.name = fields.name;

            thestudent.save(function (err) {
                if (err) {
                    res.json({"result": -1});
                } else {
                    res.json({"result": 1});
                }
            });
        })
    })
}

//类型修改
exports.leibiedetailed = function (req, res) {
    var id = req.params.id;
    leibie.find({"id": id}, function (err, results) {
        if (err || results.length == 0) {
            res.json({"s": -1});
            return;
        }
        res.json({"s": results[0]})
    })
};

//类型删除
exports.leibiedeleteYuangong = function (req, res) {
    //拿到学号
    var id = req.params.id;
    //寻找这个学号的学生
    leibie.find({"id": id}, function (err, results) {

        if (err || results.length == 0) {
            res.json({"result": -1});
            return;
        }
        //删除
        results[0].remove(function (err) {
            if (err) {
                res.json({"result": -1});
                return;
            }
            res.json({"result": 1});
        });
    });
};


<!--    进入汽车档案   -->
exports.showQiche = function (req, res) {
    res.render("qiche.ejs", {
        "result": req.session.yonghuming
    });
};
exports.sousuo=function(req,res){
    var name=req.params.name;
    qiche.sousuoname(name,function(result){
        // console.log(result)
        res.json({"data":result})
    })
}
// 得到所有汽车
exports.qichegetAllyuangong = function (req, res) {
    var page = url.parse(req.url, true).query.page - 1 || 0;
    var pagesize = 5;
    qiche.count({}, function (err, count) {
        // console.log(count);
        qiche.find({}).limit(pagesize).skip(pagesize * page).exec(function (err, result) {
            res.json({
                "qichepage": Math.ceil(count / pagesize),
                "result": result
            })
        })
    })
}
// 行号检测
exports.qichecheck = function (req, res) {
    var id = req.params.id;
    qiche.checkId(id, function (torf) {
        res.json({"result": torf});
    })
}
// 添加汽车
exports.qichedoAddyuangong = function (req, res) {
    console.log("服务器收到了一个POST请求");
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        qiche.addYuangong(fields, function (result) {
            res.json({"result": result});
        });
    });
}

exports.qicheupdateYuangong = function (req, res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        qiche.find({"id": fields.id}, function (err, results) {
            if (results.length == 0) {
                res.json({"result": -1});
                return;
            }
            var thestudent = results[0];
            thestudent.id = fields.id;
            thestudent.kuanshi = fields.kuanshi;
            thestudent.leixing = fields.leixing;
            thestudent.jiage = fields.jiage;
            thestudent.danwei = fields.danwei;
            // thestudent
            var thestudent=new qiche(thestudent)
            thestudent.save(function (err) {
                if (err) {
                    res.json({"result": -1});
                    return
                } else {
                    res.json({"result": 1});
                    return
                }
            });
        })
    })
}

//汽车修改
exports.qichedetailed = function (req, res) {
    var id = req.params.id;
    qiche.find({"id": id}, function (err, results) {
        if (err || results.length == 0) {
            res.json({"s": -1});
            return;
        }
        res.json({"s": results[0]})
    })
};

//删除汽车
exports.qichedeleteYuangong = function (req, res) {
    //拿到学号
    var id = req.params.id;
    //寻找这个学号的学生
    qiche.find({"id": id}, function (err, results) {

        if (err || results.length == 0) {
            res.json({"result": -1});
            return;
        }
        //删除
        results[0].remove(function (err) {
            if (err) {
                res.json({"result": -1});
                return;
            }
            res.json({"result": 1});
        });
    });
};
//图表
exports.tubiao = function (req, res) {
    qiche.find({}, function (err, result) {
        // console.log(result);
        res.json({
            "data": result
        })
    })
};
//图表
exports.tubiaoB = function (req, res) {
    qiche.find({}, function (err, result) {
        // console.log(result);
        res.json({
            "data": result
        })
    })
};

