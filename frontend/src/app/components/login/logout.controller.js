(function(){
	'use strict';

	angular.module('frontend')
	.controller('LogoutController', LogoutController);

	function LogoutController($scope, auth, store, $state){
		auth.signout();
		store.remove('profile');
		store.remove('token');
		$state.go('login');
	}
})();