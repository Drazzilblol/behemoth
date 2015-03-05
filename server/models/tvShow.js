
var mongoose = require('../../libs/mongoose');
var Schema = mongoose.Schema;

var ShowShema = new Schema({
    title: String
});

ShowShema.set('toJSON', {transform: mongoose.dtoTransform});

exports.Show = mongoose.model('Show', ShowShema);

