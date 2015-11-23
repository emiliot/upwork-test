'use strict';

var dotenv = require('dotenv');
var jwt = require('express-jwt');

dotenv.load();

exports.authenticate = jwt({
	secret : new Buffer(process.env.AUTH0_CLIENT_SECRET, 'base64'),
	audience : process.env.AUTH0_CLIENT_ID
});