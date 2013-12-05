var mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/bike');

var Schema = mongoose.Schema;

exports.mongoose = mongoose;
exports.schema = Schema;

