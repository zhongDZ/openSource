module.exports = function(app){
	app.use('/games/2cat',require('./app/games/2cat/router'));
}