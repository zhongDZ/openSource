var request = require('request');
var sign = require('./sign');

var APPID = 'wxc8363e5bfd9c4c3f';
var SECRET = '89ea74340a638c12e7cf822edee6389a';
var api = api || {};

// 缓存 token jsapi_ticket 等
var cache = {
  token: null,
  jsapi_ticket: null
}

api.wechatAuthBase = function(req, res, next){
    var requestUrl = req.protocol + '://' + req['headers'].host + req.originalUrl;

    if(!cache.token){
        getToken(res, requestUrl);
    }else{
        getTiket(res, requestUrl);
    }
};

var getToken = function(res, url){
  var token_url = 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid='+APPID +
      '&secret='+SECRET;

    request(token_url, function(error, response, body){
        if(!error && response.statusCode == 200){
            var data = JSON.parse(body);

            cache.token = data.access_token;

            getTiket(res, url);
        }
    });
};

var getTiket = function(res,url){
  var tiket_url = 'https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token='+cache.token+'&type=jsapi';

  if(!cache.jsapi_ticket){
    request(tiket_url, function(error, response, body){
        if(!error && response.statusCode == 200){
        var data = JSON.parse(body);

        cache.jsapi_ticket = data.ticket;
        res.render('index', { 
            title: '微信分享JSSDK',
            appid: APPID,
            sign: JSON.stringify(sign(cache.jsapi_ticket,url))
        });
        }
    });
  }else{
        res.render('index', { 
            title: '微信分享JSSDK',
            appid: APPID,
            sign: JSON.stringify(sign(cache.jsapi_ticket,url))
        });
  }
};

module.exports = api;