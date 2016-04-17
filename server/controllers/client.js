var mongoose = require('mongoose')
var Client = mongoose.model('Client')


module.exports = (function (){
  return{
    postClients : function(req, res){
      var client = new Client();

      //set the client properties that came from the Post data 
      client.id = req.body.id;
      client.secret = req.body.secret;
      client.userId = req.user._id;

      client.save(function(err){
        if(err)
          console.log(err);

          res.json({message: "Client added to the locker!", data: client});
      });
    },

    getClients: function(req, res){
      Client.find({userId: req.user._id}).exec(function(err, client){
        res.json(client)
        
        if(err){
          console.log(err);
        }

      })
    }


  }
})