'use strict';

angular.module('frontend')
.controller('MainCtrl', function ($scope, $http) {
	$scope.callApi = function(){
		$http({
			url : 'http://localhost:5000/users',
			method : 'GET'
		}).then(function(response){
			console.log('success', response);
		}, function(response){
			console.log('error ', response);
		});
	};

	$scope.stripeCallback = function(code, result){
		if(result.error){
			console.log('failed ' + result.error.message);
		}else{
			$http({
				url : 'http://localhost:5000/users/pay',
				method : 'POST',
				headers : {
					'Content-type' : 'application/json'
				},
				data : {
					stripeToken : result.id
				}

			}).then(function(response){
				console.log('success', response);
			}, function(response){
				console.log('error', response);
			});
		}
	};
});
