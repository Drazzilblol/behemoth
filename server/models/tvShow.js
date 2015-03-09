
var mongoose = require('../../libs/mongoose');
var Schema = mongoose.Schema;

var ShowShema = new Schema({
  started: {
    type: String
  },
  ended: {
    type: String
  },
  nameEN: {
    type: String
  },
  nameRU: {
    type: String
  },
  seasons: {
    type: String
  },
  status: {
    type: String
  },
  genres: {
    type: [String]
  },
  country: {
    type: String
  },
  showId: {
    type: String
  },
  imageUrl: {
    type: String
  },
  description: {
    type: String
  },
  rating: {
    type: String
  }

});

ShowShema.set('toJSON', {transform: mongoose.dtoTransform});

exports.Show = mongoose.model('Show', ShowShema);

