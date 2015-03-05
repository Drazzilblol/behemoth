var Show = require('../models/tvShow').Show;
module.exports = function (app) {
  app.get('/api/shows', function (req, res, next) {
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
};
