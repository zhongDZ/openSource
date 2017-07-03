/**
 * 服务接口
 */
const accountApi = require('./service/account');
const webWechat = require('./service/webWechat');
const accessTokenApi = require('./service/accessToken');
const jssdkApi = require('./service/jssdk');
const commonUtils = require('./../../utils/util');
var service = {};
//获取数据库公众号信息和游戏配置信息
service.getWxAccountAndSettingByKeyword = function(keyword) {
    return accountApi.getWxAccountAndSettingByKeyword(keyword);
};
//生成微信认证链接
service.getAuthUrl = function(appId, domain, myRedirectUri, state, authType) {
    return webWechat.getAuthUrl(appId, domain, myRedirectUri, state, authType);
};
//微信二次验证
service.wxAuth = function(appId, appSecret, code) {
    return webWechat.wxAuth(appId, appSecret, code);
};
service.getSnsUserInfo = function(openId, accessToken) {
    return webWechat.getSnsUserInfo(openId, accessToken);
};
/**
 * 生成微信jssdk签名
 * @param wxAccount
 * @param url 完整地址
 * @returns {Promise}
 */
service.jssdkSign = function(wxAccount, url) {
    return new Promise((resolve, reject) => {
        jssdkApi.getJsTicketInRedisDb(wxAccount.id).then(function(resultTicketObj) {
            if (resultTicketObj) {
                url = decodeURIComponent(url); //转码
                var ret = jssdkApi.sign(resultTicketObj.jsTicket, url);
                ret.appId = wxAccount.app_id;
                return resolve(ret);
            } else {
                reject('getJsTicketInRedisDb fuc js_ticket is null');
            }
        }, (err) => {
            reject(err);
        })
    });
};
//返回卡券签名
service.jssdkCardSign = function(wxAccount, openId, cardId, code) {
    return new Promise((resolve, reject) => {
        jssdkApi.getCardTicketInRedisDb(wxAccount.id).then((resultCardTicket)=>{
            if(resultCardTicket){
                code = code || '';
                var ret = jssdkApi.cardSign(resultCardTicket.jsTicket,cardId,openId,code);
                var cardExt = {
                    code:ret.code,
                    openid:ret.openid,
                    timestamp:ret.timestamp,
                    nonce_str:ret.nonceStr,
                    signature:ret.signature
                }
                return resolve(cardExt);
            }else{
                reject('getCardTicketInRedisDb fuc js_ticket is null');
            }
        },(err)=>{
            reject(err);
        });
    });
};
//获取缓存access_token值
service.getAccessTokenInRedisdb = function(wxAccountId) {
    return accessTokenApi.getAccessTokenByAccountId(wxAccountId);
};
//缓存access_token值
service.setAccessTokenToRedisdb = function(wxAccountId, accessToken) {
    return accessTokenApi.setAccessTokenToRedisdb(wxAccountId, accessToken);
};
//获取该链接的微信认证地址
service.getWechatAuthUrl = function(redirectUri) {
    return new Promise(function(resolve, reject) {
        var keyword = commonUtils.getGameKeyword(redirectUri);
        if (!keyword) {
            return resolve('');
        }
        accountApi.getWxAccountAndSettingByKeyword(keyword).then(function(wxObj) {
            var authType = wxObj.setting.auth_type;
            var appId = wxObj.account.app_id;
            var domain = wxObj.account.domain;
            var state = '';
            var authUrl = service.getAuthUrl(appId, domain, redirectUri, state, authType);
            resolve(authUrl);
        }, function(err) {
            return reject(err);
        })
    });
};
module.exports = service;
