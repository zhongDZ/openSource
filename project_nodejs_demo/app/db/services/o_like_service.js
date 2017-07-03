var Promise = require('promise');
var likeModel = require('../models/o_like_model');
var likeService = {};
/**
 * 根据id获取一行数据
 * @param id
 * @returns 返回一行数据或null
 */
likeService.findById = function(id) {
    return new Promise((resolve, reject) => {
        likeModel.findOne({
            where: {
                id: id
            }
        }).then((result) => {
                if (result) {
                    resolve(result.dataValues);
                } else {
                    resolve(result);
                }
            },
            (err) => {
                reject('[db] select like model by id err:' + err);
            })
    })
};
/** 根据参数获取一行数据
 * @param params
 * @returns 返回一行数据或null
 */
likeService.findByParams = function(params) {
    return new Promise((resolve, reject) => {
        likeModel.findOne({
            where: params,
        }).then((result) => {
            if (result) {
                resolve(result.dataValues);
            } else {
                resolve(result);
            }
        }, (err) => {
            reject('[db] select like model by params err:' + err);
        });
    });
};
likeService.delete = function(id) {
    //暂时不做删除
    return Promise.resolve(null);
};
/**
 *
 * @param {object} params 更新的的参数（json格式） eg:{name:'',phone:10086}
 * @param {object} options 更新条件 eg: {id:''}
 * @returns {number} 返回受影响的行数
 */
likeService.update = function(params, options) {
    return new Promise((resolve, reject) => {
        likeModel.update(params, {
            where: options
        }).then((result) => {
            resolve(result);
        }, (err) => {
            reject('[db] update like model err:' + err);
        });
    })
};
/**
 * 插入一行新的数据
 * @param params 需要插入的数据(json格式)
 * @returns 返回插入成功的一行数据 或 null
 */
likeService.create = function(params) {
    return new Promise((resolve, reject) => {
        likeModel.create(params).then((result) => {
            if (result) {
                resolve(result.dataValues);
            } else {
                resolve(result);
            }
        }, (err) => {
            reject('[db] create like model err:' + err);
        });
    })
};

module.exports = likeService;
