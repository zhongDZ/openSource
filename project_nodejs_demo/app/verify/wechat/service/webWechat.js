const config = require('../config/config');
const request = require('request');
var webWechat = {};
//根据openid获取用户信息
webWechat.getSnsUserInfo = function (openId, accessToken) {
    return new Promise(function (resolve, reject) {
        var url = config.wechat.getSnsUserInfoUrl(openId, accessToken);
        request({url: url, json: true}, function (err, response, body) {
            if (err) {
                reject(err);
            } else if (body.errcode) {
                reject(body.ticket)
            } else {
                resolve(body);
            }
        })
    });
};
webWechat.getAuthUrl = function (appId, domain, myRedirectUri, state, authType) {
    var callBackPath = config.wechat.call_back;
    var redirectUri = encodeURIComponent(domain + callBackPath + '?callback_uri=' + encodeURIComponent(myRedirectUri));
    state = encodeURIComponent(state);
    console.log('authType:'+authType);
    authType = authType == 1 ? 'snsapi_userinfo' : 'snsapi_base';//默认基础授权
    return config.wechat.getAuthUrl(appId, redirectUri, authType, state);
};
webWechat.wxAuth = function (appId, appSecret, code) {
    return new Promise(function (resolve, reject) {
        var url = config.wechat.getAuth2TokenUrl(appId, appSecret, code);
        request({url: url, json: true}, function (err, response, body) {
            if (err) {
                console.log('wx auth err;')
                console.log(err);
               return reject(err)
            } else if (body.errcode) {
                return reject(body.ticket)
            } else {
                return resolve(body)
            }
        })
    })
};
module.exports = webWechat;