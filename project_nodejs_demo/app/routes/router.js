var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    // res.redirect('http://www.ulnew.site');
    res.render('system/index', { title: 'Express' });
});

module.exports = router;