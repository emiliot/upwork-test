'use strict';

angular.module('frontend')
.controller('MainCtrl', function ($scope, $http, store) {
	$scope.transactions = [];
	$scope.user = store.get('profile');
	$scope.paymentOptions = [
		{
			amount : 1000,
			text : '10$'
		},
		{
			amount : 10000,
			text : '100$'
		}
	];
	$scope.paymentSelected = $scope.paymentOptions[0];

	$scope.getTransactions = function(){
		var email = $scope.user.email;
		$http({
			url : 'http://localhost:5000/users',
			method : 'GET',
			params : {
				email : email
			}
		}).then(function(response){
			console.log('success', response);
			$scope.transactions = response.data.transactions;
		}, function(response){
			console.log('error ', response);
		});
	};
	$scope.getTransactions();

	$scope.stripeCallback = function(code, result){
		if(result.error){
			console.log('failed ' + result.error.message);
		}else{
			var email = $scope.user.email;
			$http({
				url : 'http://localhost:5000/users/pay',
				method : 'POST',
				headers : {
					'Content-type' : 'application/json'
				},
				data : {
					stripeToken : result.id,
					email : email,
					amount : $scope.paymentSelected.amount
				}

			}).then(function(response){
				console.log('success', response);
				$scope.transactions.push(response.data.transaction);
			}, function(response){
				console.log('error', response);
			});
		}
	};
});
