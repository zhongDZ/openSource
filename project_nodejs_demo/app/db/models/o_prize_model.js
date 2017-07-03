var Sequelize = require('sequelize');
var moment = require('moment');
var base = require('../sequelizeBase');

module.exports = base.define('o_prize',{
    id:{
        type:Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    setting_keyword:{
        type:Sequelize.STRING,
        allowNull:false
    },
    name:{
        type:Sequelize.STRING
    },
    content:{
        type:Sequelize.STRING
    },
    state:{
        type:Sequelize.INTEGER
    },
    type:{
        type:Sequelize.INTEGER
    },
    level:{
        type:Sequelize.INTEGER
    },
    img_url:{
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