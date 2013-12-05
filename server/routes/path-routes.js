'use strict';

var db=require('../database.js');

var schema = new db.schema({ name: 'string' });
var Path = db.mongoose.model('Path', schema);

exports.addPath = function (req, res) {
	var name = req.params.name;

	Path.create({ name: name }, function (err, result) {
		if (err){
			res.send(result,500); 
		}else{
			res.send(name,200);  
		}
		// saved!
	})
	  
};

