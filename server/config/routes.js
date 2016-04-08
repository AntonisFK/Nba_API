var api = require('./../controllers/nbalogs.js');

module.exports = function(app) {
  app.get('/player/:player', function(req, res){
    console.log('show routes');
    api.player(req, res);
  });

  app.get('/team/:team', function(req, res){
    console.log('/team');
    api.team(req, res);
  })

  app.get('/player/:player/stat/:stat', function(req, res){
    console.log('/:player/stat')
    api.playerStat(req, res);
  })

  app.get('/team/:team/stat/:stat', function(req, res){
    console.log(":team/stat/:stat");
    api.teamStat(req, res);
  })

  app.get('/playervsplayer/:players', function(req, res){
    console.log("playervsplayer");
    api.playervsplayer(req, res);
  })

}

