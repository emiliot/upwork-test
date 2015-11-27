'use strict';

angular.module('frontend')
	.controller('LogoutCtrl', ['$scope', 'auth', 'store', '$state',  function($scope, auth, store, $state){
		auth.signout();
		store.remove('profile');
		store.remove('token');
		$state.go('login');
	}]);