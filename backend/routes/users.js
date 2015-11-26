'use strict';

var express = require('express'),
	router = express.Router(),
	mongoose = require('mongoose'),
	transaction = mongoose.model('Transaction');

var stripe = require("stripe")("sk_test_nUKJjc3pSxcHrfBatrzqfEw9");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/pay', function(req, res, next){
	var stripeToken = req.body.stripeToken;
	var charge = stripe.charges.create({
		amount : 1000,
		currency : 'usd',
		source : stripeToken,
		description : "Example charge"
	}, function(err, charge){
		if((err && err.type === 'StripeCardError') || !charge.paid){
			res.status(400).send({
				error : 'Card rejected for payment'
			});
		}else{
			transaction.create({
				status : charge.status,
				amount : charge.amount,
				stripeId : charge.id,
				currency : charge.currency,
				createdAt : charge.created
			}, function(err, result){
				if(err){
					res.status(500).send({ 
						error :  "Error occured while saving the transaction"
					});
				}
				res.status(201).send({
					transaction : result
				});
			});
		}
	});
});

module.exports = router;
