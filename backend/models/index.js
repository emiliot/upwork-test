'use strict';

var mongoose = require('mongoose');

exports.connect = function(){
	// database connection test
	mongoose.connect('mongodb://emiliot:upwork-test@ds033153.mongolab.com:33153/upwork-test')
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function (callback) {
		console.log('Mongolab database connection successful');
	});
}