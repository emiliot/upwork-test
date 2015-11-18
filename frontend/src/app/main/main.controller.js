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
});
