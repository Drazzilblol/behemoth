var mongoose = require('./libs/mongoose');
var async = require('async');

async.series([
  open,
  dropDatabase,
  createRecords
], function(err) {
  console.log(arguments);
  mongoose.disconnect();
  process.exit(err ? 255 : 0);
});
function open(callback) {
  mongoose.connection.on('open', callback);
}
function dropDatabase(callback) {
  var db = mongoose.connection.db;
  db.dropDatabase(callback);
}

function createRecords(callback) {
  var testRecords = [
    {
      "nameEN": "Buffy the Vampire Slayer",
      "nameRU": "Баффи – истребительница вампиров",
      "seasons": "7",
      "status": "Ended",
      "showId": "2930"
    },
    {
      "nameEN": "How I Met Your Mother",
      "nameRU": "Как я встретил вашу маму",
      "seasons": "9",
      "status": "Ended",
      "showId": "3918"
    }
  ]

  async.each(testRecords, function(rec, callback) {
    require("./server/models/tvShow")
    var show = new mongoose.models.Show(rec);

    show.save(function() {
      console.log(show);
      callback;
    });
  }, callback);

}
