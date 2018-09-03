var express=require("express");
var cont=require("./c/cont.js");
var session = require('express-session');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/Car');

var app=express();
app.set("view engine","ejs");
app.use(express.static("public"));

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
}));


// 登录页面
app.get("/",cont.Inlogin);//进入登录页
app.post("/checklogin",cont.checklogin);//检测登录


//用户管理
app.get("/index",cont.showIndex);//进入客户页面
app.propfind('/yuangong/:id', cont.check);//检测是否有该用户
app.post('/gfdh/', cont.updateYuangong);///客户修改
app.delete('/yuangong/:id', cont.deleteYuangong);//删除客户
app.get('/yuangong/:id', cont.detailed);//通过id找数据
app.post('/yuangong', cont.doAddyuangong);//添加客户
app.get("/yuangong",cont.getAllyuangong);//显示所有的客户
app.get("/findname",cont.findName);//查找数据库中客户名字，以备租赁页面的选择

//租赁登记
app.get("/zuling",cont.showZuling);
app.get("/zulingall",cont.zulingFindleixing);//渲染左边
app.get("/zulingallqiche",cont.zulingFindqiche);//渲染右边内容
app.get("/xuanze/:name",cont.xuanze);//判断当前选中的是对数据进行选择 选项卡
app.get("/dianzhong/:id",cont.dianzhong);//当前点击谁   并对下面进行渲染
app.post("/zuchu",cont.zuchu);//租出
app.get("/hhh/:id",cont.hhh);


//归还登记
app.get("/guihuan",cont.showGuihuan);//显示归还页面
app.get("/guihuandata",cont.guihuanData);//渲染归还数据
app.get("/guihuanall/:id",cont.guihuanall);//改变状态值，重新存储
app.get("/guihuanDele/:id",cont.guihuandele);//删除归还的信息
app.post("/guihuanTongji",cont.guihuanTongji);//把归还的数据存到新的库里面
//统计分析
app.get("/tongji",cont.showTongji);//进入统计页面
app.get("/tongjizuchu",cont.tongjizuchu);//查找租出取得车的数据
app.get("/tongjiguihuan",cont.tongjiguihuan);//查找租出取得车的数据
// 类别档案
app.get("/leibie",cont.showLeibie);//进入类别页面
app.propfind('/leibie/:id', cont.leibiecheck);//检查是否有改类别
app.post('/fff/', cont.leibieupdateYuangong);//类别修改
app.delete('/leibie/:id', cont.leibiedeleteYuangong);//删除类别
app.get('/leibie/:id', cont.leibiedetailed);//通过id找数据
app.post('/leibie', cont.leibiedoAddyuangong);//添加类别
app.get("/leibieall",cont.leibiegetAllyuangong);//得到所有的数据
app.get("/all",cont.all);//得到所有的数据
// 汽车档案
app.get("/qiche",cont.showQiche);//显示汽车页面
app.propfind('/qiche/:id', cont.qichecheck);//检测是否有该id的汽车
app.post('/qqq/', cont.qicheupdateYuangong);//汽车修改
app.delete('/qiche/:id', cont.qichedeleteYuangong);//汽车删除
app.get('/qiche/:id', cont.qichedetailed);//通过id找数据
app.post('/qiche', cont.qichedoAddyuangong);//添加汽车
app.get('/qicheall', cont.qichegetAllyuangong);//得到所有的数据
app.get('/sousuo/:name', cont.sousuo);//搜索
//图表
app.get("/tubiao",cont.tubiao);//图表
app.get("/tubiaoB",cont.tubiaoB);//图表

app.listen(3001);
console.log("当前端口号为3000!");
