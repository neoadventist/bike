var mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/bike');

exports.mongoose = mongoose
