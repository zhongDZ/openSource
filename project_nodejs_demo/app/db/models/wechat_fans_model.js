/**
 * 公众号粉丝表
 */
var Sequelize = require('sequelize');
var moment = require('moment');
var base = require('../sequelizeBase');
var model = base.define('wechat_fans', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    account_id: {
        type: Sequelize.INTEGER
    },
    open_id: {
        type: Sequelize.STRING
    },
    sub_scribe: {
        type: Sequelize.INTEGER
    },
    nick_name: {
        type: Sequelize.STRING
    },
    sex: {
        type: Sequelize.INTEGER
    },
    city: {
        type: Sequelize.STRING
    },
    country: {
        type: Sequelize.STRING
    },
    province: {
        type: Sequelize.STRING
    },
    language: {
        type: Sequelize.STRING
    },
    head_img_url: {
        type: Sequelize.STRING
    },
    phone_number: {
        type: Sequelize.STRING
    },
    authorize: {
        type: Sequelize.INTEGER
    },
    sub_scribe_time: {
        type: Sequelize.STRING
    },
    update_datetime: {
        type: Sequelize.STRING,
        defaultValue: moment().format('YYYY-MM-DD hh:mm:ss')
    },
    create_datetime: {
        type: Sequelize.STRING
    }
});
module.exports = model;

