'use strict';

angular.module('frontend')
.controller('MainCtrl', function ($scope, $http, store) {
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
			var email = store.get('profile').email;
			$http({
				url : 'http://localhost:5000/users/pay',
				method : 'POST',
				headers : {
					'Content-type' : 'application/json'
				},
				data : {
					stripeToken : result.id,
					email : email
				}

			}).then(function(response){
				console.log('success', response);
			}, function(response){
				console.log('error', response);
			});
		}
	};
});
