var mysql = require("mysql");
var pool = mysql.createPool({
    host: '127.0.0.1',    
    user: 'root',
    password:'123',
    port:'3306',
    database:'nodesample'
});

var client = {};

client.query = function(sql, callBack){
    pool.getConnection(function(err, connection) {
        connection.query(sql, function(err, results) {   
            if (results) {
	            callBack(results);
	        }
            //释放连接
            connection.release();
        });
    });
}

client.addData = function(sql, param,callBack){
	pool.getConnection(function(err, connection) {
        connection.query(sql, param, function(err, results) {   
            if (results) {
	            callBack(results);
	        }
            //释放连接
            connection.release();
        });
    });
}

client.reduceData = function(sql, callBack){
	pool.getConnection(function(err, connection) {
        connection.query(sql, function(err, results) {   
            if (results) {
	            callBack(results);
	        }
            //释放连接
            connection.release();
        });
    });
}

client.checkData = function(sql, callBack){
	pool.getConnection(function(err, connection) {
        connection.query(sql, function(err, results) {   
            if (results) {
	            callBack(results);
	        }
            //释放连接
            connection.release();
        });
    });
}

client.updateData = function(sql, param, callBack){
	pool.getConnection(function(err, connection) {
        connection.query(sql, param, function(err, results) {   
            if (results) {
	            callBack(results);
	        }
            //释放连接
            connection.release();
        });
    });
}

module.exports = client;