var express = require('express');
var session = require('express-session');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var http = require('http');
var redisStore = require('connect-redis')(session);

/***************************自定义模块***************************/
//引入配置文件
var config = require('./app/config/exportConfig');
/***************************自定义模块***************************/

var app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');
app.set('views', path.join(__dirname, './views'));//设置项目启动路径
app.engine('.html', require('ejs').__express).set('view engine', 'html');//替换文件扩展名ejs为html

app.use(favicon(path.join(__dirname, '', './public/favicon1.ico')));
app.use(logger('dev'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({extended: true, limit: '50mb'}));
app.use(cookieParser());
app.use(bodyParser.raw({extended: true, limit: '50mb'}));
app.use(bodyParser.raw({extended: true, limit: '50mb', type: 'image/jpeg'}));
app.use(bodyParser.raw({extended: true, limit: '50mb', type: 'image/*'}));
app.use(express.static(path.join(__dirname, './public')));
// app.use(express.static(path.join(__dirname, 'public')));
//将静态资源访问路径加多一级虚拟目录 
//ex : normalPath ./images/test.png  change ./static/images/test.png
// app.use('/static', express.static('public'));

app.use(session({
    name: 'zhongdezong',
    cookie: {maxAge: 80000},
    store: new redisStore({
        host: config.redis.host,
        port: config.redis.port,
        pass: config.redis.password,
        db: config.redis.database
    }),
    resave: false, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
    secret: 'zhongdezong'
}));

/***************************路由设置·整理成一个module***************************/
require('./router')(app);
require('./router_games')(app);
/***************************路由设置·整理成一个module***************************/

/***************************错误处理***************************/
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});
app.use(function(err, req, res, next) {
	var status = err.status || 500;
	res.status(status);
	// console.log(err);
	res.render('./system/error', {
		title : '出错鸟...',
	    msg : 'message..'+err.message +'\n..错误码..'+status+'\n..路径..'+req.path,
	    env: req.app.get('env')
	});
});
/***************************错误处理***************************/

/***************************工程入口·启动服务器***************************/
var port = process.env.PORT || 3000;
app.set('port', port);
var server = http.createServer(app);
server.listen(port, function(){
  console.log('Express server listening on port  '+ server.address().port)
});
server.on('error', function(err){
	console.log('start server err!' + port);
});
/***************************工程入口·启动服务器***************************/

// 暴露此模块
// module.exports = app;
