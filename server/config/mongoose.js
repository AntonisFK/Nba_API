var mongoose = require('mongoose');
var fs = require('fs')

mongoose.connect('mongodb://127.0.0.1:27017/NbaLogs');


mongoose.connection.once('connected', function(){
  console.log("connected to database")
}); 

mongoose.connection.on('error', console.error.bind(console, 'connection error:')); 

var models_path = __dirname + '/../models';

fs.readdirSync(models_path).forEach(function(file){
  if(file.indexOf('.js') > 0) {
    require(models_path + '/' +file);
  }
})
