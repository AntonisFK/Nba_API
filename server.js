var express = require('express'); 
var path = require('path');
var bodyParser = require('body-parser'); 

var app = express(); 

app.use(bodyParser.json()); 

require('./server/config/mongoose.js')
require('./server/config/routes.js')(app);

app.listen(3000, function(){
  console.log('Nba Api running on port 3000') 
}); 

