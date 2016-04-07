var api = require('./../controllers/nbalogs.js');

module.exports = function(app) {
  app.get('/show', function(req, res){
    console.log('show routes');
    api.show(req, res);
  });

  app.get('/:Tm/:Player', function(req, res){
    console.log('/team');
    api.team(req, res);
  })

}

