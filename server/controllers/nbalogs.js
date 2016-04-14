var mongoose = require('mongoose'); 
var NbaLog = mongoose.model('NbaLog');
var meta = { meta:{author:["Antonis Fkiaras"]}}
module.exports = (function(){
  return{
    player: function(req, res){
      req.accepts('application/json')
      NbaLog.find({Player: req.params.player }).sort({date: -1}).exec(function(err, logs){
        // res.set('Content-Type','application/vnd.api+json')
        if(logs === []){
          res.status(400).send('Bad Request')
        }
        if(err){
          console.log(err);
        }
        res.json({meta, data:{type:"Nba 2014, 2015 player logs"},logs})
      })
        
    },
    team: function(req, res){
      console.log(req.params);

      NbaLog.find({Tm: req.params.team}).sort({date:-1}).exec(function(err, logs){
        res.json(logs);
        if(err){
          console.log(err);
        }
      })
    },

    playerStat: function(req, res){
      //first element will be the player rest will be what stat they want 
      var statQuerry = {};
      var player = {Player: req.params.player}
      var stat = req.params.stat.split(", ");

      for(i of stat){
        statQuerry[i] = 1
      };
      console.log(statQuerry);
      NbaLog.find(player, statQuerry).sort({date:-1}).exec( function(err, logs){
        res.json(logs);
        if(err){
          console.log(err);
        }
      })
      //Nba.find({Player: sdds}{Tm:1})
    },

    teamStat: function(req, res){
    //   var statQuerry ={req.params.stat.split(", ")}, var team ={Tm: req.params.team};
    var statQuerry = {} 
    var team = {Tm: req.params.team};
    var stat = req.params.stat.split(", ");
    for(i of stat){
      statQuerry[i] = 1;
    }
    NbaLog.find(team, statQuerry, function(err, logs){
      res.json(logs);
      if(err){
        console.log(err);
      }
    })
    },
    playervsplayer: function(req, res){
      // var players = req.params.players.split(", ");
      console.log(req.params);
      var players = req.params.players.split(", ");

      NbaLog.find({Player: {$in: palyers}}).sort({date:-1}).exec(function(err, logs){
        res.json(logs);
        if(err){
          console.log(err);
        }
      })

      // find({Player: { $in: ["DeAndre Jordan", "A.J. Price"]}})
    }
  }
})();  
