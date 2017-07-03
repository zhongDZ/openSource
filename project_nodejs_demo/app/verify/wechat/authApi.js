const service = require('./service');
var api = {};
//微信基础认证
api.wechatAuthBase = function (req, res, next) {
    var fans = req.session.fans;
    var originalUrl = req.originalUrl;
    if (!fans) {
        if (req.query.debug === 'true') {
            console.log('Debugging wechat page with base authorization:' + req.url);
            req.session.fans = {
                "openid": " xxxx111xxx111xxx",
                "nickname": '幽乐鲸',
                "sex": "1",
                "province": "广东",
                "city": "广州",
                "country": "CN",
                "headimgurl": "http://wx.qlogo.cn/mmopen/g3MonUZtNHkdmzicIlibx6iaFqAc56vxLSUfpb6n5WKSYVY0ChQKkiaJSgQ1dZuTOgvLLrhJbERQQ4eMsv84eavHiaiceqxibJxCfHe/64",
                "privilege": [
                    "chinaunicom"
                ],
                "unionid": "xxxxxxxxxxxxx" //只有在用户将公众号绑定到微信开放平台帐号后，才会出现该字段。
            };
            next();
        } else {
            //转跳到授权页面
            service.getWechatAuthUrl(originalUrl).then(function (resultUrl) {
                if (!resultUrl) {
                    console.log('wechat page with base authorization 200:' + req.originalUrl);
                    res.status(200).end();
                    return;
                } else {
                    console.log('wechat page with base authorization successful:' + req.originalUrl);
                    res.redirect(resultUrl);//转跳到微信认证页面
                }
            }, function (err) {
                res.status(500).end();
                return;
            });
        }
    } else {
        next();
    }
};
api.checkFans = function(req, res, next) {
    var fans = req.session.fans;
    if(!fans){
        res.json({code:0,msg:'no wechat auth.'})
    }else{
        next();
    }
};
module.exports = api;
