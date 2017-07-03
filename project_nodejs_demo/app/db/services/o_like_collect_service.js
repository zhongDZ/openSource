var Promise = require('promise');
var likeCollectModel = require('../models/o_like_collect_model');
var likeCollectService = {};

/**
 * 获取一行数据
 * @param id
 * @returns 返回一行数据或null
 */
likeCollectService.getById = function(id) {
    return new Promise((resolve, reject) => {
        likeCollectModel.findOne({
            where: {
                id: id
            }
        }).then(
            (result) => {
                if (result) {
                    resolve(result.dataValues);
                } else {
                    resolve(result);
                }
            }, (err) => {
                reject('[db] select likeCollect model by id err:' + err);
            })
    });
};

/**
 * 插入一条数据
 * @param likeCollect
 * @returns 返回插入的一行数据或null
 */
likeCollectService.create = function(params) {
    return new Promise((resolve, reject) => {
        likeCollectModel.create(params).then(
            (result) => {
                if (result) {
                    resolve(result.dataValues);
                } else {
                    resolve(result);
                }
            },
            (err) => {
                reject('[db] create likeCollect model err:' + err);
            }
        )
    });
};
/**
 * 根据条件更新数据
 * @param params  需要更新的数据
 * @param options 更新条件
 * @returns {*}
 */
likeCollectService.update = function(params, options) {
    return new Promise((resolve, reject) => {
        likeCollectModel.update(
            params, { where: options }
        ).then(
            (result) => {
                resolve(result);
            },
            (err) => {
                reject('[db] update likeCollect model err:' + err);
            }
        )
    })
};
likeCollectService.delete = function() {
    //暂时不做删除
    return Promise.resolve(null);
};
/**
 *  获取分页数据
 * @param params  查询参数
 * @param currentPage  当前页
 * @param countPerPage  每页多少条
 * @param orderBy 排序条件  eg:[['id','DESC'],['name']]
 * @returns {boolean}
 */
likeCollectService.getListByPage = function(params, currentPage, countPerPage, orderBy) {
    return new Promise((resolve, reject) => {
        likeCollectModel.findAll({
            where: params,
            limit: countPerPage,
            offset: countPerPage * (currentPage - 1),
            order: orderBy
        }).then(
            (result) => {
                resolve(result);
            },
            (err) => {
                reject('[db] select likeCollect model list by page err:' + err);
            })
    });
};
/**
 * 根据参数获取列表数据并排列
 * @param params   eg:{'id':""}
 * @param orderBy  eg:[['id','DESC'],['name']]
 */
likeCollectService.getListByParams = function(params, orderBy) {
    return new Promise((resolve, reject) => {
        likeCollectModel.findAll({
            where: params,
            order: orderBy
        }).then(
            (result) => {
                resolve(result);
            },
            (err) => {
                reject('[db] select likeCollect model list by params  err:' + err);
            });
    });
};
/**
 * 该条件下数据的总数
 * @param params
 * @returns {*}
 */
likeCollectService.count = function(params) {
    return new Promise((resolve, reject) => {
        likeCollectModel.count({
            where: params
        }).then(
            (result) => {
                resolve(result)
            },
            (err) => {
                reject('[db] count likeCollect model by params  err:' + err);
            })
    });
};

module.exports = likeCollectService;
