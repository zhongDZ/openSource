var config = config || {};
config.db = {
	host: '127.0.0.1',    
    user: 'root',
    password:'123',
    port:'3306',
    database:'nodesample',
	charset : 'UTF8'
}

// redis 地址
config.redis = {
    host: '127.0.0.1',
    port: '6379',
    password: 'ccw_zdz_zws@123',
    database: 5
}
module.exports = config;