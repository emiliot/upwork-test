'use strict';

angular.module('frontend')
	.controller('LoginCtrl', ['$scope', 'auth', '$state', 'store', function($scope, auth, $state, store){
		$scope.user = '';
		$scope.password = '';

		function onLoginSuccess(profile, token){
			$scope.$parent.message = '';
			$state.go('home');
			$scope.loading = false;
			store.set('profile', profile);
			store.set('token', token);
		}

		function onLoginFailed(){
			$scope.$parent.message = 'invalid credentials';
			$scope.loading = false;
		}

		$scope.doGoogleAuthWithPopup = function(){
			$scope.$parent.message = 'loading ...';
			$scope.loading = true;

			auth.signin({
				popup : false,
				connection : 'google-oauth2',
				scope: 'openid name email'
			}, onLoginSuccess, onLoginFailed);
		}

		console.log('login');
	}]);