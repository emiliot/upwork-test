'use strict';

var express = require('express'),
	router = express.Router(),
	mongoose = require('mongoose'),
	transaction = mongoose.model('Transaction');

var stripe = require("stripe")("sk_test_nUKJjc3pSxcHrfBatrzqfEw9");

/* GET users listing. */
router.get('/', function(req, res, next) {
	var email = req.query.email;
	transaction.findByEmail(email, function(err, results){
		if(err){
			res.status(500).send({
				error : "Error occured fetching previous transactions"
			});
		}else{
			res.status(200).send({
				transactions : results
			});
		}
	});
});

router.post('/pay', function(req, res, next){
	var stripeToken = req.body.stripeToken,
		amount = req.body.amount,
		email = req.body.email;
	
	var charge = stripe.charges.create({
		amount : amount,
		currency : 'usd',
		source : stripeToken,
		description : "Example charge"
	}, function(err, charge){
		if((err && err.type === 'StripeCardError') || !charge || !charge.paid){
			res.status(400).send({
				error : err//'Card rejected for payment'
			});
		}else{
			transaction.create({
				status : charge.status,
				amount : charge.amount,
				stripeId : charge.id,
				currency : charge.currency,
				email : email,
				createdAt : Date(charge.created)
			}, function(err, result){
				if(err){
					res.status(500).send({ 
						error :  "Error occured while saving the transaction"
					});
				}else{
					res.status(201).send({
						transaction : result
					});
				}
			});
		}
	});
});

module.exports = router;
