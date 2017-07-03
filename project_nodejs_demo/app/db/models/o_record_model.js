/**
 * game信息表
 */
var Sequelize = require('sequelize');
var base = require('../sequelizeBase');
var moment = require('moment');

module.exports = base.define('o_setting', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    setting_keyword:{
        type:Sequelize.STRING,
        allowNull:false
    },
    open_id: {
        type: Sequelize.STRING
    },
    nick_name: {
        type: Sequelize.STRING
    },
    prize_id: {
        type: Sequelize.INTEGER
    },
    prize_name: {
        type: Sequelize.STRING
    },
    state: {
        type:Sequelize.INTEGER,
    },
    score: {
        type:Sequelize.INTEGER,
    },
    name: {
        type:Sequelize.STRING,
    },
    phone: {
        type:Sequelize.STRING,
    },
    email: {
        type:Sequelize.STRING,
    },
    address: {
        type:Sequelize.STRING,
    },
    remarks: {
        type:Sequelize.STRING,
    },
    create_datetime:{
        type: Sequelize.STRING,
        defaultValue:moment().format('YYYY-MM-DD hh:mm:ss')
    },
    field_1: {
        type: Sequelize.STRING
    },
    field_2: {
        type: Sequelize.STRING
    },
    field_3: {
        type: Sequelize.STRING
    }
});

