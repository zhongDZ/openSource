var Sequelize = require('sequelize');
var moment = require('moment');
var base = require('../sequelizeBase');

module.exports = module.exports = base.define('o_like_collect',{
    id:{
        type:Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    setting_keyword:{
        type:Sequelize.STRING,
        allowNull:false
    },
    like_id:{
        type:Sequelize.INTEGER
    },
    sponsor_open_id:{
        type:Sequelize.STRING
    },
    actor_open_id:{
        type:Sequelize.STRING
    },
    count:{
        type:Sequelize.INTEGER
    },
    content:{
        type:Sequelize.STRING
    },
    state:{
        type:Sequelize.STRING
    },
    result:{
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