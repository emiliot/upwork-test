'use strict';

var dotenv = require('dotenv'),
	jwt = require('express-jwt'),
	mongoose = require('mongoose'),
	path = require('path'),
	fs = require('fs');

dotenv.load();

exports.auth = {
	authenticate : jwt({
		secret : new Buffer(process.env.AUTH0_CLIENT_SECRET, 'base64'),
		audience : process.env.AUTH0_CLIENT_ID
	})
};

exports.db = {
	loadModels : function (){
		console.log('Loading models..');
		var modelsPath = path.normalize(__dirname+ '/models');
		fs.readdirSync(modelsPath).forEach(function (file) {
		    if (/\.js$/.test(file)) {
		        require(modelsPath + '/' + file);
		    }
		});
		console.log('Loading complete..');
	},
	connect : function(){
		mongoose.connect('mongodb://emiliot:upwork-test@ds033153.mongolab.com:33153/upwork-test')
		var db = mongoose.connection;
		db.on('error', console.error.bind(console, 'connection error:'));
		db.once('open', function () {
			console.log('Mongolab database connection successful');
		});
	}
}