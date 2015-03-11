var express = require('express');
var config = require('./config/config');
var connect = require('connect');
var app = express();
var http = require('http');
var passport = require('./libs/passport');

app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.cookieParser());
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.session({ secret: 'securedsession' }));
app.use(passport.initialize()); // Add passport initialization
app.use(passport.session()); // Add passport initialization
app.use(app.router);
app.use(express.static(__dirname + '/client'));


require('./server/routes/index')(app);

// will print stacktrace
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
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
