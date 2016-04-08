var mongoose = require('mongoose'); 
var NbaLog = mongoose.model('NbaLog');

module.exports = (function(){
  return{
    player: function(req, res){
      console.log(req.params.player)
      NbaLog.find({Player: req.params.player }).sort({date: -1}).exec(function(err, logs){
        res.json(logs);
        if(err){
          console.log(err);
        }
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
      console.log(req.params.player);
      var statQuerry ={};
      var player = {Player: req.params.player};
      console.log(player)
       statQuerry = req.params.stat.split(", ");

      for(i of stat){
        querry[i] = 1
      };
      console.log(statQuerry);
      NbaLog.find(player, statQuerry, function(err, logs){
        res.json(logs);
        if(err){
          console.log(err);
        }
      })
      //Nba.find({Player: sdds}{Tm:1})
    },

    teamStat: function(req, res){
      var statQuerry ={req.params.stat.split(", ")}, team ={Tm: req.params.team};

    }
  }
})();  
