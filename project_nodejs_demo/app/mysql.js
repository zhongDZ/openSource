// var mysql      = require('mysql');
// var connection = mysql.createConnection({
//   host     : 'localhost',
//   user     : 'root',
//   password : '123',
//   database : 'nodesample'
// });

// connection.connect();

// connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
//   if (err) {
//     console.log(err);
//     return;
//   };
//   console.log('The solution is: ', rows[0].solution);
// });

// connection.end();


// /*---------------------------创建----------------------------*/

// var mysql  = require('mysql');  //调用MySQL模块
// //创建一个connection
// var connection = mysql.createConnection({    
// 	connectionLimit: 50,
// 	host: 'localhost',
// 	user: 'root',
// 	password: '123',
// 	database: 'nodesample'
// });

// //创建一个connection
// connection.connect(function(err){
//     if(err){       
//         console.log('[query] - :'+err);
//         return;
//     }
//     console.log('[connection connect]  succeed!');
// }); 

// //执行SQL语句
// connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
//     if (err) {
//         console.log('[query] - :'+err);
//         return;
//     }
//     console.log('The solution is: ', rows[0].solution); 
// }); 

// //关闭connection
// connection.end(function(err){
//     if(err){       
//         return;
//     }
//     console.log('[connection end] succeed!');
// });

/*---------------------------增加----------------------------*/
// var mysql = require('mysql');
// var connection = mysql.createConnection({
// 	connectionLimit: 50,
// 	host: 'localhost',
// 	user: 'root',
// 	password: '123',
// 	database: 'nodesample'
// });

// connection.connect();

// var addVip = 'insert into mytable(name, age, address) values(?,?,?)';
// var param = ['测试',100,'测试'];
// connection.query(addVip, param, function(error, result){
//     if(error)
//     {
//         console.log(error.message);
//     }else{
//         console.log('insert id: '+result.insertId);
//     }
// });
// connection.end();

/*---------------------------删除----------------------------*/
// var mysql = require('mysql');
// var connection = mysql.createConnection({
//     connectionLimit: 50,
// 	host: 'localhost',
// 	user: 'root',
// 	password: '123',
// 	database: 'nodesample'
// });

// connection.connect();

// var addVip = 'delete from mytable where id = 2';
// connection.query(addVip, function(error, result){
//     if(error)
//     {
//         console.log(error.message);
//     }else{
//         console.log('affectedRows: '+result.affectedRows);
//     }
// });

// connection.end();

/*---------------------------查找----------------------------*/
// var mysql = require("mysql");
// var connection = mysql.createConnection({
//     connectionLimit: 50,
// 	host: 'localhost',
// 	user: 'root',
// 	password: '123',
// 	database: 'nodesample'
// });

// connection.connect();
// connection.query('select * from mytable', function(error, results, fields){
//     if (error) {
//         throw error;
//     }
//     if (results) {
//         for(var i = 0; i < results.length; i++)
//         {
//             console.log('%s\t%s',results[i].name,results[i].id);
//         }
//     }
// });

// connection.end();


/*---------------------------修改----------------------------*/
// var mysql = require('mysql');
// var connection = mysql.createConnection({
//     connectionLimit: 50,
// 	host: 'localhost',
// 	user: 'root',
// 	password: '123',
// 	database: 'nodesample'
// });
// connection.connect();
// var userSql = "update mytable set age = ? where id = ?";
// var param = [99, 3];
// connection.query(userSql, param, function (error, result) {
//     if(error)
//     {
//         console.log(error.message);
//     }else{
//         console.log('affectedRows: '+result.affectedRows);
//     }
// });
// connection.end();

/*---------------------------使用连接池----------------------------*/
var mysql = require("mysql");
var pool = mysql.createPool({
    host: '127.0.0.1',    
    user: 'root',
    password:'123',
    port:'3306',
    database:'nodesample'
});

//连接池可以直接使用，也可以共享一个连接或管理多个连接（引用官方示例）
//直接使用
// pool.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
//     if (err) throw err;
//     console.log('The solution is: ', rows[0]);
// });

// //监听connection事件
// pool.on('connection', function(connection) { 
//     connection.query('select * from mytable', function(error, results, fields){
//         if (error) {
//             throw error;
//         }
//         if (results) {
//             for(var i = 0; i < results.length; i++)
//             {
//                 console.log('%s\t%s',results[i].name,results[i].id);
//             }
//         }
//     });
// });


// var client = {};

// // //共享连接
// client.myQuery = function(sql){
//     pool.getConnection(function(err, connection) {
//         connection.query(sql, function(err, results) {   
//             if (results) {
// 	            for(var i = 0; i < results.length; i++){
// 	                console.log('%s\t%s',results[i].name, results[i].id, results[i].address);
// 	            }
// 	        }
//             //释放连接
//             connection.release();
//         });

//         //Error: Connection already released,应该每次到连接池中再次获取
//         // connection.query( 'SELECT * FROM seckill;', function(err, result) {
//         //  console.log(result);
//         //  connection.release();
//         // });

//     });
// }

// module.exports = client;

/*---------------------------断开重连----------------------------*/
// var mysql = require('mysql');

// var db_config = {
// 	host: '127.0.0.1',    
//     user: 'root',
//     password:'123',
//     port:'3306',
//     database:'nodesample'
// };

// var connection;

// function handleDisconnect() {
//     connection = mysql.createConnection(db_config);                                              
//     connection.connect(function(err) {             
//         if(err) {                                    
//             console.log('进行断线重连：' + new Date());
//             setTimeout(handleDisconnect, 2000);   //2秒重连一次
//             return;
//         }        
//         console.log('连接成功'); 
//     });                                                                          

//     connection.on('error', function(err) {
//         console.log('db error', err);
//         if(err.code === 'PROTOCOL_CONNECTION_LOST') {
//             handleDisconnect();                        
//         } else {                                     
//             throw err;                                
//         }
//     });
// }

// handleDisconnect();

/*---------------------------防止sql注入----------------------------*/

// var mysql = require('mysql');

// var pool = mysql.createPool({
//     	host: '127.0.0.1',    
//     user: 'root',
//     password:'123',
//     port:'3306',
//     database:'nodesample'

// });

// function myQuery(sql)
// {
//     pool.getConnection(function(err,connection){
//         connection.query(sql,function(err,result){
//             //console.log(err);
//             console.log(result);
//             connection.release();
//         });

//         // connection.query('SELECT * FROM userinfo WHERE id = ' + pool.escape('5 OR ID = 6') ,function(err,result){
//         // //console.log(err);
//         // console.log(result);
//         // connection.release();
//         // });

//     });
// }

// myQuery('SELECT * FROM mytable WHERE id = ' + '2 OR id = 3');
// myQuery('SELECT * FROM mytable WHERE id = ' + pool.escape('2 OR id = 3'));