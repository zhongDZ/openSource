var express = require('express');
var router = express.Router();

var db = require('../../db/mysqlDb');
var util = require('../../utils/util');
//接入微信验证
var authApi = require('../../verify/wechat/authApi');

// 该路由使用的中间件
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});
// 定义网站主页的路由
// authApi.wechatAuthBase,
router.get('/startUp', authApi.wechatAuthBase, function(req, res) {
	//获取请求链接
	var _originalUrl = req.originalUrl;

	//通过正则获取项目名字
	var _gameName = util.getGameKeyword(_originalUrl);
  	db.query('SELECT * FROM mytable;', function(_res){
		res.render('games/2cat/startup', {
			gameName : _gameName,
			title : 'gameName',
			name : _res[0].name,
			age : _res[0].age,
			address : _res[0].address
		});
	});
});

//开始游戏接口
router.post('/startGame', function (req, res) {
	var reqData = req.body;
	var wx_id = reqData.wx_id;
	var nick_name = reqData.nick_name;
	console.log(wx_id, nick_name)

	db.query('SELECT * FROM mytable;', function(_res){
		res.json({
			code : 1,//0代表网络出错，1代表成功，2代表请求成功，但无游戏次数。(对应的msg需要修改)
			msg : '请求成功！',
			data : _res
		});
	});
});

//增加
router.post('/addUrl', function (req, res) {
	var reqData = req.body;
	var wx_id = reqData.wx_id;
	var nick_name = reqData.nick_name;

	var sql = 'insert into mytable(name, age, address) values(?,?,?)';
	var param = ['测试',100,'测试'];
	db.addData(sql, param, function(_res){
		res.json({
			code : 1,//0代表网络出错，1代表成功，2代表请求成功，但无游戏次数。(对应的msg需要修改)
			msg : '请求成功！',
			data : _res
		});
	});
});


//减少
router.post('/reduceUrl', function (req, res) {
	var reqData = req.body;
	var wx_id = reqData.wx_id;
	var nick_name = reqData.nick_name;

	var sql = 'delete from mytable where id = 5';
	db.reduceData(sql, function(_res){
		res.json({
			code : 1,//0代表网络出错，1代表成功，2代表请求成功，但无游戏次数。(对应的msg需要修改)
			msg : '请求成功！',
			data : _res
		});
	});
});

//查找
router.post('/checkUrl', function (req, res) {
	var reqData = req.body;
	var wx_id = reqData.wx_id;
	var nick_name = reqData.nick_name;

	var sql = 'select * from mytable';
	db.checkData(sql, function(_res){
		res.json({
			code : 1,//0代表网络出错，1代表成功，2代表请求成功，但无游戏次数。(对应的msg需要修改)
			msg : '请求成功！',
			data : _res
		});
	});
});

//更新
router.post('/updateUrl', function (req, res) {
	var reqData = req.body;
	var wx_id = reqData.wx_id;
	var nick_name = reqData.nick_name;

	var sql = "update mytable set age = ? where id = ?";
	var param = [9889, 12];
	db.updateData(sql, param, function(_res){
		res.json({
			code : 1,//0代表网络出错，1代表成功，2代表请求成功，但无游戏次数。(对应的msg需要修改)
			msg : '请求成功！',
			data : _res
		});
	});
});

module.exports = router;