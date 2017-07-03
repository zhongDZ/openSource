var Sequelize = require('sequelize');
var base = require('../sequelizeBase');
var moment = require('moment');
module.exports = base.define('o_setting', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    keyword: {
        type: Sequelize.STRING,
        allowNull:false,//是否允许为空
        unique:true//字段是否UNIQUE
    },
    title: {
        type: Sequelize.STRING
    },
    description:{
        type:Sequelize.STRING
    },

    expire_url: {
        type: Sequelize.STRING
    },
    state: {
        type:Sequelize.INTEGER
    },
    account_id: {
        type:Sequelize.INTEGER
    },
    auth_type: {
        type:Sequelize.INTEGER
    },
    lottery_type:{
        type:Sequelize.INTEGER
    },
    lottery_url:{
        type:Sequelize.STRING
    },
    start_datetime: {
        type: Sequelize.STRING
    },
    end_datetime: {
        type: Sequelize.STRING
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


