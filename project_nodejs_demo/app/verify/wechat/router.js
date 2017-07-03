const express = require('express');
const service = require('./service');
const jwt = require('jsonwebtoken');
const commonUtils = require('./../../utils/util');
var router = express.Router();
//微信验证回调
router.all('/callback', function (req, res) {
    var code = req.query.code;
    if (!code) {
        //用户拒绝授权
        console.log('[wechat auth] User denied authorization.')
        return res.status(200).end();
    }
    var state = req.query.state;
    var redirectUri = req.query.callback_uri;
    console.log('[wechat auth] callback redirect url :' + redirectUri);
    var keyword = commonUtils.getGameKeyword(redirectUri);
    service.getWxAccountAndSettingByKeyword(keyword).then((wxObj) => {
        var appId = wxObj.account.app_id;
        var appSecret = wxObj.account.app_secret;
        console.log('[wechat auth]callback sns params - appId:' + appId + '|appSecret:' + appSecret + '|code:' + code);
        return service.wxAuth(appId, appSecret, code);
    }).then((authResult) => {
        console.log('callback wxAuth:' + JSON.stringify(authResult));
        if (!authResult) {
            res.status(500).end();
            throw new Error('[wechat auth] sns/oauth2/access_token fail.');
        }
        var accessToken = authResult.access_token;
        //判断是否是基础还是高级授权
        if (authResult.scope === 'snsapi_userinfo') {
            return service.getSnsUserInfo(authResult.openid, accessToken);
        } else if (authResult.scope === 'snsapi_base') {
            return {openid: authResult.openid};
        } else {
            res.status(500).end();
            throw new Error('[wechat auth] unsupported scope: ' + auth.scope);
        }
    }).then((userResult) => {
        req.session.fans = userResult;
        var newRedirectUri = decodeURIComponent(redirectUri);
        console.log('[wechat auth] callback auth successful and redirect url:' + newRedirectUri);
        res.redirect(newRedirectUri);
    }, (err) => {
        console.log('[wechat auth] callback last:' + err);
        res.status(500).end();
    })
});
//获取jssdk信息，用于该游戏
router.post('/jssdk/h5', function (req, res) {
    var url = req.body.url;
    var keyword = commonUtils.getGameKeyword(url);
    if (!url || !keyword) {
        res.json({code: 0, msg: 'params wrong.'});
        return;
    }
    service.getWxAccountAndSettingByKeyword(keyword).then((wxObj) => {
        return service.jssdkSign(wxObj.account, url);
    }).then((result) => {
        console.log('/jssdk 获取 微信JSSDK认证成功！');
        res.json({code: 1, msg: '', data: result});
    }, (err) => {
        console.log('11111:' + err);
        res.json({code: 0, msg: err});
    })
});
//获取微信卡券签名信息
router.post('/jssdkCard', (req, res) => {
    var cardCode = req.body.code || '';
    var cardId = req.body.card_id || '';
    var keyword = req.body.keyword || '';
    var fans = req.session.fans;
    if (!fans || !cardId || !cardCode || !keyword) {
        return res.json({code: 0, msg: 'err params or not webchat user.'});
    }
    var openId = fans.openid;
    service.getWxAccountAndSettingByKeyword(keyword).then((wxObj)=> {
        return service.jssdkCardSign(wxObj.account, openId, cardId, cardCode);
    }).then((result)=> {
        console.log('获取 微信card sign 签名成功！');
        res.json({code:1,msg:'',data:result});
    }, (err)=> {
        res.json({code: 0, msg: err})
    })

});
module.exports = router;
