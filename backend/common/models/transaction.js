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

transactionSchema.statics.findByEmail = function(email, cb){
	return this.find({ email : email}, cb);
}

mongoose.model('Transaction', transactionSchema);