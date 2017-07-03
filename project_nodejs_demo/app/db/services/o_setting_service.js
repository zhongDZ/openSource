var Promise = require('promise');
var settingModel = require('../models/o_setting_model');
var settingService = {};
//根据id获取该表一行数据
settingService.getSettingById = function(id) {
    return new Promise((resolve, reject) => {
        settingModel.findOne({
            where: {
                id: id
            }
        }).then((result) => {
            if (result) {
                resolve(result.dataValues);
            } else {
                resolve(result)
            }
        }, (err) => {
            reject(err);
        })
    });
};
//根据keyword获取该表一行数据
settingService.getSettingByKeyword = function(keyword) {
    return new Promise((resolve, reject) => {
        settingModel.findOne({
            where: {
                keyword: keyword
            }
        }).then((result) => {
            if (result) {
                resolve(result.dataValues);
            } else {
                resolve(result)
            }
        }, (err) => {
            reject(err);
        })
    });
};
module.exports = settingService;
