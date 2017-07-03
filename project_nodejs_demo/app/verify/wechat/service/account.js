const redisDb = require('../../../db/redisDb');
const settingModel = require('../../../db/models/o_setting_model');
const wechatAccountModel = require('../../../db/models/wechat_account_model');
const Promise = require('promise');
var accountApi = {};
accountApi.getWxAccountAndSettingByKeyword = function(keyword) {
    return new Promise(function(resolve, reject) {
        var wxObj = {};
        accountApi.getGameSettingByKeyword(keyword).then(function(setting) {
                if (setting) {
                    wxObj.setting = setting;
                    return accountApi.getWxAccountById(setting.account_id);
                } else {
                    reject('not find game setting by keyword:', keyword);
                }
            }).then(function(account){
            	if(account){
            		wxObj.account = account;
            		resolve(wxObj);
            	}else{
                    reject('not find wx account by id:', wxObj.setting.account_id);
            	}
            },function(err){
            	reject(err);
            });

    });
};
//根据关键字获取一行o_setting表的信息
accountApi.getGameSettingByKeyword = function(keyword) {
    return new Promise(function(resolve, reject) {
        redisDb.get('GAME_SETTING_' + keyword).then(function(strJson) {
            if (strJson) {
                var setting = JSON.parse(strJson);
                resolve(setting);
            } else {
                settingModel.findOne({
                    where: {
                        keyword: keyword
                    }
                }).then(function(result) {
                    if (result) {
                        redisDb.set('GAME_SETTING_' + keyword, JSON.stringify(result));
                    }
                    resolve(result);
                }, function(err) {
                    reject(err)
                });
            }
        });
    });
};
//根据账号获取账号的信息
accountApi.getWxAccountById = function(id) {
    return new Promise(function(resolve, reject) {
        redisDb.get('WECHAT_ACCOUNT_' + id).then(function(strJson) {
            if (strJson) {
                var account = JSON.parse(strJson);
                resolve(account);
            } else {
                wechatAccountModel.findOne({
                    where: {
                        id: id
                    }
                }).then(function(result) {
                    if (result) {
                        redisDb.set('WECHAT_ACCOUNT_' + id, JSON.stringify(result));
                    };
                    resolve(result);
                }, function(err) {
                    reject(err);
                });
            }
        });
    });
};
module.exports = accountApi;