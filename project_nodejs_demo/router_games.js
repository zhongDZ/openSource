module.exports = function(app){
	app.use('/games/game01',require('./app/games/game01/router'));
}