var Show = require('../models/tvShow').Show;
var passport = require('../../libs/passport');
module.exports = function (app) {
  // Define a middleware function to be used for every secured routes
  var auth = function(req, res, next){
    if (!req.isAuthenticated())
      res.send(401);
    else
      next();
  };


  app.get('/api/shows', auth, function (req, res, next) {
    // use mongoose to get all todos in the database
    Show.find(function (err, shows) {
      // if there is an error retrieving, send the error. nothing after res.send(err) will execute
      if (err) {
        return next(err);
      }
      res.json(shows); // return all todos in JSON format
    });
  });
  app.get('/api/shows/:id', function (req, res) {
    var id = req.params.id;
    // use mongoose to get all todos in the database
    Show.findOne({showId: id}, function (err, show) {
      // if there is an error retrieving, send the error. nothing after res.send(err) will execute
      if (err) {
        return next(err);
      }

      if (!show) {
        res.status(404);
        res.send('Show not found');
      } else {
        res.json(show); // return all todos in JSON format
      }

    });
  });

  app.post('/api/users/login', passport.authenticate('local'), function(req, res) {
    res.send(req.user);
  });

  app.post('/api/users/logout', function(req, res){
    req.logOut();
    res.send(200);
  });

  app.get('/api/users/loggedin', function(req, res) {
    res.send(req.isAuthenticated() ? req.user : '0');
  });
};
