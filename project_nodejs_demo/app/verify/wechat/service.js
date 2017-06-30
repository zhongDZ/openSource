// var accountApi = require('./service/account');
// var webWechat = require('./service/webWechat');
// var accessTokenApi = require('./service/accessToken');
// var jssdk = require('./service/jssdk');
// var commonUtils = require('../../utils/util');
var request = require('request');

//获取数据库公众号信息和游戏配置信息
service.getWxAccountAndSettingByKeyword = function(keyword) {
    return accountApi.getWxAccountAndSettingByKeyword(keyword);
};

module.exports = service;