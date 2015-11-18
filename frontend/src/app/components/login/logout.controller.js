'use strict';

angular.module('frontend')
	.controller('LogoutCtrl', ['$scope', 'auth', function($scope, auth){
		console.log('logout');

		auth.signout();
		store.remove('profile');
		store.remove('token');
		$scope.$parent.message = '';
		$state.go('login');
	}]);