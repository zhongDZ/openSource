var express = require('express');
var router = express.Router();
router.get('/startUp', function (req, res, next) {
    res.render('games/game01/startup', {
    	title : 'gameName',
    });
});

module.exports = router;