(function(){
	'use strict';

	angular.module('frontend')
		.controller('LoginController', LoginController);

	function LoginController($scope, auth, $state, store){
		var vm = $scope;
		vm.user = '';
		vm.password = '';

		function onLoginSuccess(profile, token){
			$state.go('home');
			vm.loading = false;
			store.set('profile', profile);
			store.set('token', token);
		}

		function onLoginFailed(){
			vm.$parent.message = 'invalid credentials';
			vm.loading = false;
		}

		vm.doGoogleAuthWithPopup = function(){
			auth.signin({
				popup : false,
				connection : 'google-oauth2',
				scope: 'openid name email'
			}, onLoginSuccess, onLoginFailed);
		}
	}
})();