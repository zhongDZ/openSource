var Sequelize = require('sequelize');
var base = require('../sequelizeBase');
var moment = require('moment');
module.exports  = base.define('wechat_account', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    app_id: {
        type: Sequelize.STRING
    },
    app_secret: {
        type: Sequelize.STRING
    },
    name: {
        type: Sequelize.STRING
    },
    remark: {
        type: Sequelize.STRING
    },
    domain: {
        type: Sequelize.STRING
    },
    create_datetime: {
        type:Sequelize.STRING,
        defaultValue:moment().format('YYYY-MM-DD hh:mm:ss')
    }
});


