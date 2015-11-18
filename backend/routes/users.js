var express = require('express');
var router = express.Router();

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
		if(err && err.type === 'StripeCardError'){
			res.status(400).send({
				error : 'Card rejected for payment'
			});
		}else{
			res.send({
				status : 'payment successful',
				charge : charge
			});
		}
	});
});

module.exports = router;
