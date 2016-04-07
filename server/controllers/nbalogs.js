var mongoose = require('mongoose'); 
var NbaLog = mongoose.model('NbaLog');

module.exports = (function(){
  return{
    show: function(req, res){
      NbaLog.find({}, function(err, logs){
        res.json(logs);
        if(err){
          console.log(err);
        }
      })
    },
    team: function(req, res){
      console.log(req.params);

      NbaLog.find(req.params.Player, function(err, logs){
        res.json(logs);
        if(err){
          console.log(err);
        }
      })
    }
  }
})();  
