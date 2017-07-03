var conf = require('../config/exportConfig');
var Sequelize = require('sequelize');
var base = new Sequelize(conf.db.database, conf.db.user, conf.db.password, {
    host: conf.db.host,
    port: conf.db.port,
    dialect: 'mysql',//数据库使用mysql
    define: {
        underscored: true,
        freezeTableName: true,
        timestamps: false
    }
});
module.exports = base;