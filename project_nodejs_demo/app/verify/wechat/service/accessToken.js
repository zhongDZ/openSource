/**
 * 获取微信token值
 */
const redisDb = require('../../../db/redisDb');
const config = require('./../config/config');
const wechatAccountModel = require('../../../db/models/wechat_account_model');
const Promise = require('promise');
const request = require('request');
var accessToken = {};
//向微信获取access_token值
accessToken.getAccessTokenForWechat = function (appId, appSecret) {
    var atUrl = config.wechat.getAccessTokenUrl(appId, appSecret);
    var options = {
        method: 'GET',
        url: atUrl,
        json: true
    };
    return new Promise((resolve, reject) => {
        request(options, function (err, res, body) {
            if (res) {
                resolve(body.access_token);
            } else {
                return reject(err);
            }
        })
    });
};
//根据id 获取access_token值
accessToken.getAccessTokenByAccountId = function (wxAccountId) {
    return new Promise(function (resolve, reject) {
        redisDb.get('WECHAT_ACCESS_TOKEN_' + wxAccountId).then(function (resultJson) {
            if(resultJson) {
                var tokenObj = JSON.parse(resultJson);
                resolve(tokenObj);
            }else{
               return wechatAccountModel.findOne({
                    where: {
                        id: wxAccountId
                    }
                })
            }
        }).then(function(resultAccount) {
            if (resultAccount) {
               return accessToken.getAccessTokenForWechat(resultAccount.dataValues.app_id,resultAccount.dataValues.app_secret)
            };
            reject('mysql : get account info is null!');
        }).then(function (resultAccessToken) {
            if(resultAccessToken){
                console.log('1：set access_token to redis.')
               resolve(accessToken.setAccessTokenToRedisdb(wxAccountId,resultAccessToken));
            }else{
                reject('access_token null.')
            }
        },function (err) {
            reject(err);
        });
    })
}
//根据id设置redis中的access token 值
accessToken.setAccessTokenToRedisdb = function (wxAccountId, accessToken) {
    var tokenObj = {access_token: accessToken, time: new Date().getTime()};
    redisDb.setex('WECHAT_ACCESS_TOKEN_' + wxAccountId, JSON.stringify(tokenObj), 7200);
    return tokenObj;
}
module.exports = accessToken;