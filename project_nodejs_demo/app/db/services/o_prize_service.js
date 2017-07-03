var Promise = require('promise');
var Sequelize = require('sequelize');
var prizeModel = require('../models/o_prize_model');
var common = require('../../utils/util');
var redisDb = require('../../db/redisDb');
var prizeService = {};

prizeService.getById = function (id) {
    return new Promise((resolve, reject) => {
        prizeModel.findOne({
            where: {
                id: id,
                state: 0
            }
        }).then((result) => {
                if (result) {
                    resolve(result.dataValues);
                } else {
                    resolve(result)
                }
            },
            (err) => {
                reject(err);
            })
    })
};
/**
 * 获取可抽奖品列表,根据奖品类型获取
 * @param settingKeyword
 * @returns {list}
 */
prizeService.getPrizeListByParams = function (settingKeyword) {
    return new Promise((resolve, reject) => {
        if (common.isBlank(settingKeyword)) {
            return resolve(null);
        }
        ;
        prizeModel.findAll({
            attributes: [
                [Sequelize.literal('distinct type'), 'type'],
                'name',
                'content',
                'img_url'
            ],
            where: {
                setting_keyword: settingKeyword,
                state: 0
            },
            order:['type']
        }).then((result) => {
            if (result && result.length > 0) {
                resolve(JSON.parse(JSON.stringify(result)));
            } else {
                resolve(result);
            }
        }, (err) => {
            reject(err);
        });
    });
};
prizeService.create = function (params) {
    return new Promise((resolve, reject) => {
        prizeModel.create(params).then((result) => {
            if (result) {
                resolve(result.dataValues);
            } else {
                resolve(result);
            }
        }, (err) => {
            reject(err);
            reject('[db] create prize model err:' + err);
        });
    })
};
/**
 *
 * @param {object} params 更新的的参数（json格式） eg:{name:'',state:1}
 * @param {object} options 更新条件 eg: {id:''}
 * @returns {number} 返回受影响的行数
 */
prizeService.update = function (params, options) {
    return new Promise((resolve, reject) => {
        prizeModel.update(params, {
            where: options
        }).then((result) => {
            resolve(result);
        }, (err) => {
            reject('[db] update prize model err:' + err);
        });
    })
};
/**
 *  （未测）
 * @param params 条件参数（object）
 * @param currentPage 当前页数
 * @param countPerPage ，每页数目
 * @param orderBy 排序参数 eg:[['id','DESC'],['name']]
 * @returns {*|exports|module.exports}
 */
prizeService.getByPage = function (params, currentPage, countPerPage, orderBy) {
    return new Promise((resolve, reject) => {
        prizeModel.findAll({
            where: params,
            limit: countPerPage,
            offset: countPerPage * (currentPage - 1),
            order: orderBy
        }).then((result) => {
            resolve(result);
        }, (err) => {
            reject(err);
        })
    });
};

prizeService.count = function (params) {
    return new Promise((resolve, reject) => {
        prizeModel.count({
            where: params
        }).then((result) => {
            resolve(result)
        }, (err) => {
            reject(err);
        })
    });
};

/**
 * 获取redis列表里的一行数据,成功则设置数据库该奖品为已用使用
 * @param  {string} settingKeyword 游戏关键标识
 * @param  {number} levelNum 奖品等级，没有则默认为0
 * @return {object} 返回奖品信息 或 null
 */
prizeService.getListInRedisDb = function (settingKeyword, levelNum) {
    return new Promise((resolve, reject) => {
        if (common.isBlank(settingKeyword) || !common.isNumber(levelNum)) {
            return resolve(null);
        }
        var returnPrize = {};
        var redisKey = 'GAME_PRIZE_' + settingKeyword + '_' + levelNum;
        redisDb.llen(redisKey).then((rLength) => {
            if (rLength > 0) {
                return redisDb.rpop(redisKey);
            } else {
                return Promise.resolve(null);
            }
        }).then((prize) => {
            if (prize) {
                returnPrize = JSON.parse(prize);
                return prizeService.update({state: 1}, {id: returnPrize.id})
            } else {
                return Promise.resolve(null);
            }
        }).then((resultRows)=> {
            if (resultRows && resultRows > 0) {
                resolve(returnPrize);
            } else {
                resolve(null);
            }
        }, (err)=> {
            reject(err);
        })
    });
};
/**
 * 更新{state:0}的奖品到redis db 中
 * @param  {string} settingKeyword 奖品归属的类别
 * @return {number} 返回更新的数量
 */
prizeService.reloadListInRedisDbByKeyword = function (settingKeyword) {
    return new Promise((resolve, reject) => {
        if (common.isBlank(settingKeyword)) {
            return resolve(null);
        }
        prizeModel.findAll({
            attributes: [
                //获取奖品的的等级类型
                [Sequelize.literal('distinct level'), 'level']
            ],
            where: {
                setting_keyword: settingKeyword,
                state: 0
            }
        }).then((resultLevel) => {
            if (resultLevel && resultLevel.length > 0) {
                //删除现有的奖品列表
                var arr = [];
                resultLevel.forEach((item)=> {
                    arr.push('GAME_PRIZE_' + settingKeyword + '_' + item.level);
                })
                if (redisDb.del(arr)) {
                    return prizeModel.findAll({
                        where: {
                            setting_keyword: settingKeyword,
                            state: 0
                        }
                    })
                } else {
                    return Promise.resolve(null);
                }
            } else {
                reject('[mysql] no prize level info.')
            }
        }).then((resultPrizeList)=> {
            if (!resultPrizeList || resultPrizeList.length <= 0) {
                return resolve(0);
            } else {
                var lockKeyName = 'LOCK_KEY_' + settingKeyword;
                redisDb.isLock(lockKeyName).then((isLock)=> {
                    if (isLock) {
                        return resolve(resultPrizeList.length);
                    }
                    var rs = [];
                    resultPrizeList.forEach((item)=> {
                        redisDb.lpush('GAME_PRIZE_' + settingKeyword + '_' + item.level, JSON.stringify(item)).then((result)=> {
                            if (result) {
                                rs.push(1)
                            } else {
                                rs.push(0)
                            }
                            if (rs.length === resultPrizeList.length) {
                                resolve(resultPrizeList.length);
                                redisDb.del(lockKeyName);
                            }
                        }, (err)=> {
                            rs.push('err');
                            if (rs.length === resultPrizeList.length) {
                                resolve(resultPrizeList.length);
                                redisDb.del(lockKeyName);
                            }
                        })
                    })
                })
            }
        }, (err)=> {
            reject(err);
        })
    });
};
/**
 * [exports description]
 * @type {[type]}
 */
module.exports = prizeService;
