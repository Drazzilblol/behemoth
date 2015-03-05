var express = require('express');
var config = require('./config/config');
var connect = require('connect');
var app = express();
var http = require('http');
var bodyParser = require('body-parser');
//var errorHandler = connect.errorHandler();
require('./server/routes/index')(app);

app.use(bodyParser.urlencoded({extended: 'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({type: 'application/vnd.api+json'})); // parse application/vnd.api+json as json
app.use(express.static(__dirname + '/client'));

// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    //       errorHandler(err, req, res, next);
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  var stack = err.stack;
  console.error(err.stack);
  res.status(500).send('Something broke!');
  //remove stack from client
  err.stack = '';
//    errorHandler(err, req, res, next);
  //print missed error stack
  if ('test' !== app.get('env')) {
    logger.error(stack);
  }
});

http.createServer(app).listen(config.defaultPort);
console.log("port listen");

module.exports = app;
