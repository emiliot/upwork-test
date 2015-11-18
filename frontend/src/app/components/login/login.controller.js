'use strict';

angular.module('frontend')
	.controller('LoginCtrl', ['$scope', 'auth', function($scope, auth){
		$scope.user = '';
		$scope.password = '';

		console.log('login');
	}]);