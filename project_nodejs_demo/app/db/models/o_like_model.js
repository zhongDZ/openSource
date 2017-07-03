var Sequelize = require('sequelize');
var moment = require('moment');
var base = require('../sequelizeBase');

module.exports = base.define('o_like',{
    id:{
        type:Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    setting_keyword:{
        type:Sequelize.STRING,
        allowNull:false
    },
    sponsor_open_id:{
        type:Sequelize.STRING
    },
    nick_name:{
        type:Sequelize.STRING
    },
    collect:{
        type:Sequelize.INTEGER
    },
    score:{
        type:Sequelize.INTEGER
    },
    content:{
        type:Sequelize.STRING
    },
    state:{
        type:Sequelize.INTEGER
    },
    result:{
        type:Sequelize.STRING
    },
    name:{
        type:Sequelize.STRING
    },
    phone:{
        type:Sequelize.STRING
    },
    email:{
        type:Sequelize.STRING
    },
    address:{
        type:Sequelize.STRING
    },
    remarks:{
        type:Sequelize.STRING
    },
    create_datetime:{
        type:Sequelize.STRING,
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