
var mongoose = require('../../libs/mongoose');
var Schema = mongoose.Schema;

var UserShema = new Schema({
    username: {
      type: String
    },
    password: {
      type: String
    }
  });

UserShema.set('toJSON', {transform: mongoose.dtoTransform});

exports.User = mongoose.model('User', UserShema);