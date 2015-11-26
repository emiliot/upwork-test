'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var transactionSchema = new Schema({
	email : String,
	amount : Number,
	currency : String,
	status : String,
	stripeId : String,
	createdAt : { type: Date, default: Date.now }
});

mongoose.model('Transaction', transactionSchema);