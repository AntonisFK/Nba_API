// load required packages 
var mongoose = require('mongoose');

var ClientSchema = new mongoose.Schema({
  id: {type: String, reuired: true},
  secret: {type: String, required: true},
  userId: {type: String, required: true}
});

mongoose.model('Client', ClientSchema)