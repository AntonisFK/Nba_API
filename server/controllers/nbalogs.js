var mongoose = require('mongoose'); 
var NbaLog = mongoose.model('NbaLog');

var meta = {author:{github: "AntonisFK"}}
var checkForHexReqExp = new RegExp("^[0-9a-fA-F]{24}$");
var checkForSpecChar = new RegExp(/[~`!#$%\^&*+=\-\[\]\\';/{}|\\":<>\?]/)

module.exports = (function(){
  return{
    
    logsId: function(req, res){
      console.log("logsId", req.params)
      var id = req.params.id; 

      if(!checkForHexReqExp.test(req.params.id)){
        res.status(400).send('Bad Request')} 
      else {
        mongoose.Types.ObjectId(id);
        NbaLog.findOne({_id: id}).sort({date: -1}).exec(function(err, logs){
          if(err){
            console.log(err); 
          }
         if(logs === null){
          res.status(400).send('Bad Request') 
         }
         else {
           res.json(logs); 
         }
       })
      }
    },

    player: function(req, res){
      console.log(req.params.player)
      NbaLog.find({Player: req.params.player }).sort({date: -1}).exec(function(err, logs){
        // res.set('Content-Type','application/vnd.api+json')
        console.log( logs.length)
        if(logs.length === 0){
          console.log("empty")
          res.status(400).send('Bad Request')
        } else {
          res.type('application/json').json({meta, data:{type:"Nba 2014, 2015 player logs"},logs})
        }

        if(err){
          console.log(err);
          res.status(400).send('Bad Request')
        }
        
      })
        
    },
    team: function(req, res){
      if(checkForSpecChar.test(req.params.team)){
        res.status(400).send('Bad Request')
      } else {
        NbaLog.find({Tm: req.params.team}).sort({date:-1}).exec(function(err, logs){
          if(logs.length === 0){
            console.log("empty")
            res.status(400).send('Bad Request');
          } else {
            res.type('application/json').json({meta, data:{type:"Nba 2014, 2015 player logs"},logs})
          }

          if(err){
            console.log(err);
            res.status(400).send('Bad Request');
          }
        
        })
      }
    },

    playerStat: function(req, res){
      //first element will be the player rest will be what stat they want 
      var statQuerry = {};
      var player = {Player: req.params.player};
      var stat = req.params.include.split(", ");

      for(i of stat){
        //check for special char and add stats and player. Maybe think about moving this 
        if(checkForSpecChar.test(i) && checkForSpecChar.test(player)){
          res.status(400).send('Bad Request');
        } else{
        statQuerry[i] = 1
        }
      };
      console.log(statQuerry);
     
      NbaLog.find(player, statQuerry).sort({date:-1}).exec( function(err, logs){
         if(logs.length === 0){
          console.log("empty")
          res.status(400).send('Bad Request')
        } else {
          res.json({meta, data:{type:"Nba 2014, 2015 player logs"},logs})
        }

        if(err){
          console.log(err);
          res.status(400).send('Bad Request')
        }
        
      })
      //Nba.find({Player: sdds}{Tm:1})
    },

    teamStat: function(req, res){
    //   var statQuerry ={req.params.stat.split(", ")}, var team ={Tm: req.params.team};
    var statQuerry = {} 
    var team = {Tm: req.params.team};
    var stat = req.params.include.split(", ");
    
    NbaLog.find(team, statQuerry, function(err, logs){
       if(logs.length === 0){
          console.log("empty")
          res.status(400).send('Bad Request')
        } else {
          res.type('application/json').json({meta, data:{type:"Nba 2014, 2015 player logs"},logs})
        }

        if(err){
          console.log(err);
          res.status(400).send('Bad Request')
        }
        
      })
    },
    players: function(req, res){
      // var players = req.params.players.split(", ");
      console.log(req.params);
      var players = req.params.players.split(", ");

      NbaLog.find({Player: {$in: players}}).sort({date:-1}).exec(function(err, logs){
         if(logs.length === 0){
          console.log("empty")
          res.status(400).send('Bad Request')
        } else {
          res.type('application/json').json({meta, data:{type:"Nba 2014, 2015 player logs"},logs})
        }

        if(err){
          console.log(err);
          res.status(400).send('Bad Request')
        }
        
      })
    },
  playersStat: function(req, res){
    var players = req.params.players.split(", ");
    var statQuerry = {}; 
    var stat = req.params.include.split(", ");
    
    for(i of stat){
      statQuerry[i] = 1;
    }
    NbaLog.find({Player: {$in: players}}, statQuerry).sort({date:-1}).exec(function(err, logs){
         if(logs.length === 0){
      
          res.status(400).send('Bad Request')
        } 
        else {
          res.type('application/json').json({meta, data:{type:"Nba 2014, 2015 player logs"},logs})
        }

        if(err){
          console.log(err);
          res.status(400).send('Bad Request')
        }
    })

  }
}
})();  
