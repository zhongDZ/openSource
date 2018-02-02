module.exports = function(app){
	//处理首页
	app.use('/', require('./app/routes/router'));

	//测试接口
	// app.use('/test',require('./app/test/router'));

	//微信验证
	app.use('/verify/wechat',require('./app/verify/wechat/router'));
}