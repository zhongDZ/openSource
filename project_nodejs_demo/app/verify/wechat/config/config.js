/**
 * 微信开发通用配置文件
 */
var config = {};
config.wechat = {
    access_token_url: 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid={appid}&secret={appsecret}',
    js_ticket_url:'https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token={accesstoken}&type=jsapi',
    card_ticket_url:'https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token={accesstoken}&type=wx_card',
    sns_user_info_url: 'https://api.weixin.qq.com/sns/userinfo?access_token={access_token}&openid={openid}&lang=zh_CN',
    auth_url: 'https://open.weixin.qq.com/connect/oauth2/authorize?appid={appid}&redirect_uri={redirect_uri}&response_type=code&scope={scope}&state={state}#wechat_redirect',
    call_back: '/verify/wechat/callback',
    auth2_token_url: 'https://api.weixin.qq.com/sns/oauth2/access_token?appid={appid}&secret={appsecret}&code={code}&grant_type=authorization_code',

};
//jsapi_ticket
config.wechat.getJsTicketUrl = function (accessToken) {
    if(!accessToken)
        return '';
    return config.wechat.js_ticket_url.replace('{accesstoken}',accessToken);
}
//卡券临时票据地址
config.wechat.getCardTicketUrl = function(accessToken){
    if(!accessToken)
        return '';
    return config.wechat.card_ticket_url.replace('{accesstoken}',accessToken);
}
//access_token 地址
config.wechat.getAccessTokenUrl = function (appId, appSecret) {
    if (!appId || !appSecret)
        return '';
    return config.wechat.access_token_url.replace('{appid}', appId).replace('{appsecret}', appSecret);
};
config.wechat.getSnsUserInfoUrl = function (openId, accessToken) {
    console.log('--config.wechat.getAuthUrl:'+openId+'|'+accessToken);
    if (!openId || !accessToken) {
        return '';
    }
    return config.wechat.sns_user_info_url.replace('{openid}', openId).replace('{access_token}', accessToken);
};
//授权转跳地址
config.wechat.getAuthUrl = function (appId, redirectUrl, scope, state) {
    console.log('--config.wechat.getAuthUrl:'+appId+'|'+redirectUrl+'|'+scope+'|'+state);
    if (!appId || !redirectUrl || !scope) {
        return '';
    }
    return config.wechat.auth_url.replace('{appid}', appId).replace('{redirect_uri}', redirectUrl).replace('{scope}', scope).replace('{state}', state);
};
config.wechat.getAuth2TokenUrl = function (appId, appSecret, code) {
    console.log('--config.wechat.getAuth2TokenUrl:'+appId+'|'+appSecret+'|'+code);
    if (!appId || !appSecret || !code)
        return '';
    return config.wechat.auth2_token_url.replace('{appid}', appId).replace('{appsecret}', appSecret).replace('{code}', code);
}

module.exports = config;
