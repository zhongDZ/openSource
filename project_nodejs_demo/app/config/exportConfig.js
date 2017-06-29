/*
* 根据情况输出生产或者开发的配置文件
* ex: 在命令行键入 export NODE_ENV=production && npm start
*/
var env = process.env.NODE_ENV == 'production' ? 'production' : 'development';
console.log('[development environment]: '+env);
module.exports = require('./config.'+env);