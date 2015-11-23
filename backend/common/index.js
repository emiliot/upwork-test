'use strict';

var dotenv = require('dotenv');
var jwt = require('express-jwt');
var mongoose = require('mongoose');

dotenv.load();

exports.authenticate = jwt({
	secret : new Buffer(process.env.AUTH0_CLIENT_SECRET, 'base64'),
	audience : process.env.AUTH0_CLIENT_ID
});

exports.connect = function(){
	mongoose.connect('mongodb://emiliot:upwork-test@ds033153.mongolab.com:33153/upwork-test')
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function () {
		console.log('Mongolab database connection successful');
		console.log('Loading models..');

		var modelsPath = path.normalize(__dirname+ './models');
		fs.readdirSync(modelsPath).forEach(function (file) {
		    if (/\.js$/.test(file)) {
		        require(modelsPath + '/' + file);
		    }
		});
	});
}