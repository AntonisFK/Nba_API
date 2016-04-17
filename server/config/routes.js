var api = require('./../controllers/nbalogs.js');
var client = require('./../controllers/client.js');


module.exports = function(app) {
  
  app.get('/logs/:id', function(req, res){
    console.log('logs/:id');
    api.logsId(req, res); 
  })

  app.get('/player/:player', function(req, res){
    console.log('show routes');
    api.player(req, res);
  });

  app.get('/team/:team', function(req, res){
    console.log('/team');
    api.team(req, res);
  })

  app.get('/player/:player/:include', function(req, res){
    console.log('/:player/stat')
    api.playerStat(req, res);
  })

  app.get('/team/:team/:include', function(req, res){
    console.log(":team/stat/:stat");
    api.teamStat(req, res);
  })

  app.get('/players/:players', function(req, res){
    console.log("playervsplayer");
    api.players(req, res);
  })

  app.get('/players/:players/:include', function(req, res){
    console.log("player/:include");
    api.playersStat(req, res);
  })

  app.post('/clients', function(req, res){
    console.log("/clients post");

  }) 
app.use(function(req, res, next) {
  res.status(404).send(" <h1>Ummm......</h1>");
});

}

