const request = require('request');
const Promise = require('promise');
const redisDb = require('../../../db/redisDb');
const config = require('../config/config');
const accessTokenApi = require('./accessToken');
const jsSHA = require('jssha');

var jssdk = {};
//向微信获取js_ticket值
jssdk.getJsTicketForWechat = function (accessToken) {
    return new Promise((resolve, reject) => {
        var url = config.wechat.getJsTicketUrl(accessToken);
        request({url: url, json: true}, function (err, response, body) {
            if (err) {
                return reject(err);
            }
            if (body.errcode === 0) {
                return resolve(body.ticket);
            }
            return reject(body.errmsg);
        })
    })
};
//在缓存找改公众号的js_ticket,没有则创建继续找
jssdk.getJsTicketInRedisDb = function (wxAccountId) {
    return new Promise((resolve, reject) => {
        redisDb.get('WECHAT_JSAPI_TICKET_' + wxAccountId).then((resultStr) => {
            if (resultStr) {
                var ticketObj = JSON.parse(resultStr);
                resolve(ticketObj);
            } else {
                //获取access_token值
                return accessTokenApi.getAccessTokenByAccountId(wxAccountId).then((resultTokenObj) => {
                    if (resultTokenObj) {
                        return jssdk.getJsTicketForWechat(resultTokenObj.access_token);
                    } else {
                        reject('jssdk.getJsTicketInRedisDb fuc get accessToken is null');
                    }
                }).then((resultJsTicket) => {
                    if (resultJsTicket) {
                        resolve(jssdk.setJsTicketToRedisDb(wxAccountId, resultJsTicket));
                    } else {
                        reject('jssdk.getCardTicketInRedisDb fuc get jsapi ticket is null');
                    }
                }, (err) => {
                    reject(err);
                })
            }
        }, (err) => {
            reject(err);
        })
    })
};
//缓存该公众号的js_ticket
jssdk.setJsTicketToRedisDb = function (wxAccountId, jsTicket) {
    var ticketObj = {jsTicket: jsTicket, time: new Date().getTime()};
    redisDb.setex('WECHAT_JSAPI_TICKET_' + wxAccountId, JSON.stringify(ticketObj), 7200);
    return ticketObj;
};
//调用微信接口获取 card ticket
jssdk.getCardTicketForWechat = function (accessToken) {
    return new Promise((resolve, reject) => {
        var url = config.wechat.getCardTicketUrl(accessToken);
        request({url: url, json: true}, function (err, response, body) {
            if (err) {
                return reject(err);
            }
            if (body.errcode === 0) {
                return resolve(body.ticket);
            }
            return reject(body.errmsg);
        })
    })
};
//查缓存是否有card ticket，没有则调用微信接口获取
jssdk.getCardTicketInRedisDb = function (wxAccountId) {
    return new Promise((resolve, reject) => {
        redisDb.get('WECHAT_CARD_TICKET_' + wxAccountId).then((resultStr) => {
            if (resultStr) {
                var cardTicketObj = JSON.parse(resultStr);
                resolve(cardTicketObj);
            } else {
                //获取access_token值
                return accessTokenApi.getAccessTokenByAccountId(wxAccountId).then((resultTokenObj) => {
                    if (resultTokenObj) {
                        return jssdk.getCardTicketForWechat(resultTokenObj.access_token);
                    } else {
                        reject('jssdk.getCardTicketInRedisDb fuc get accessToken is null');
                    }
                }).then((resultCardTicket) => {
                    if (resultCardTicket) {
                        resolve(jssdk.setCardTicketToRedisDb(wxAccountId, resultCardTicket));
                    } else {
                        reject('jssdk.getCardTicketInRedisDb fuc get cardTicket is null');
                    }
                }, (err) => {
                    reject(err);
                })
            }
        }, (err) => {
            reject(err);
        })
    });
};
//缓存改公众号的card_ticket
jssdk.setCardTicketToRedisDb = function (wxAccountId, cardTicket) {
    var cardTicketObj = {jsTicket: jsTicket, time: new Date().getTime()};
    redisDb.setex('WECHAT_CARD_TICKET_' + wxAccountId, JSON.stringify(cardTicketObj), 7200);
    return cardTicketObj;
};
/**
 * 签名算法
 * @param jsapi_ticket 用于签名的 jsapi_ticket
 * @param url 用于签名的 url ，注意必须动态获取，不能 hardcode
 * @returns
 */
jssdk.sign = function (jsapi_ticket, url) {
    var ret = {
        jsapi_ticket: jsapi_ticket,
        nonceStr: createNonceStr(),
        timestamp: createTimestamp(),
        url: url
    };
    var string = raw(ret);
    var shaObj = new jsSHA(string, 'TEXT');
    ret.signature = shaObj.getHash('SHA-1', 'HEX');
    return ret;
};
/**
 * 卡券签名算法
 * @return {[type]} [description]
 */
jssdk.cardSign = function (cardTicket, cardId, openId, code) {
    var ret = {
        code: code,
        openid: openId,
        nonceStr: createNonceStr(),
        timestamp: createTimestamp()
    };
    var tmpStr = [cardTicket, cardId, code, openId, ret.nonceStr, ret.timestamp].sort().join('');
    var shaObj = new jsSHA(tmpStr, 'TEXT');
    ret.signature = shaObj.getHash('SHA-1', 'HEX');
    return ret;
};

function createNonceStr() {
    return Math.random().toString(36).substr(2, 15);
}

function createTimestamp() {
    return parseInt(new Date().getTime() / 1000) + '';
}

function raw(args) {
    var keys = Object.keys(args);
    keys = keys.sort()
    var newArgs = {};
    keys.forEach(function (key) {
        newArgs[key.toLowerCase()] = args[key];
    });

    var string = '';
    for (var k in newArgs) {
        string += '&' + k + '=' + newArgs[k];
    }
    string = string.substr(1);
    return string;
}
module.exports = jssdk;
