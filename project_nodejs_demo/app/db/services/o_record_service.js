var Promise = require('promise');
var recordModel = require('../models/o_record_model');
var recordService = {};

recordService.getById = function(id) {
    return new Promise((resolve, reject) => {
        recordModel.findOne({
            where: {
                id: id
            }
        }).then((result) => {
            if (result) {
                resolve(result.dataValues);
            } else {
                resolve(result);
            }
        }, (err) => {
            reject(err);
        })
    });
};
recordService.create = function(record) {
    return new Promise((resolve, reject) => {
        recordModel.create(record).then((result) => {
            resolve(result); //成功返回1
        }, (err) => {
            reject(err);
        });
    })
};
recordService.update = function(record) {
    return new Promise((resolve, reject) => {
        recordModel.update(record).then((result) => {
            resolve(result);
        }, (err) => {
            reject(err);
        });
    })
};
recordService.delete = function(id) {
    //暂时不做删除
    return Promise.resolve(null);
};
/**
 * 获取分页
 * @param  {[type]} params       条件参数
 * @param  {[type]} currentPage  当前页，默认1
 * @param  {[type]} countPerPage 分页大小
 * @param  {[type]} orderBy      [description]
 * @return {[type]}              [description]
 */
recordService.getByPage = function(params, currentPage, countPerPage, orderBy) {
    return new Promise((resolve, reject) => {
        recordModel.findAll({
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
recordService.getByParams = function(params, orderBy) {
    return new Promise((resolve, reject) => {
        recordModel.findOne({
            where: params,
            order: orderBy
        }).then((result) => {
            if (result) {
                resolve(result.dataValues);
            } else {
                resolve(result);
            }
        }, (err) => {
            reject(err);
        });
    });
};
recordService.count = function(params) {
    return new Promise((resolve, reject) => {
        recordModel.count({
            where: params
        }).then((result) => {
            resolve(result)
        }, (err) => {
            reject(err);
        })
    });
};
module.exports = recordService;
