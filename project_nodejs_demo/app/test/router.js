var express = require('express');
var router = express.Router();
router.get('/01', function (req, res, next) {
    // res.redirect('http://www.ulnew.site');
    // res.render('index', { title: 'Express' });
    res.json({
		code : 1,//0代表网络出错，1代表成功，2代表请求成功，但无游戏次数。(对应的msg需要修改)
		msg : '请求成功！',
		data : {
			
		}
	});
});

module.exports = router;