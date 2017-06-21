var express = require('express');
var db = require('./module_sql');
var router = express.Router();

router.get('/',function(req, res, next){
    db.query('SELECT * FROM mytable;', function(_res){
		for(var i = 0; i < _res.length; i++){
	        console.log(_res[i].name, _res[i].id, _res[i].address);
	    }
	});
	// res.send(JSON.stringify (result));
});
module.exports=router;