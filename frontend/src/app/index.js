'use strict';

angular.module('frontend', ['ngResource', 'ui.router', 'ui.bootstrap', 'auth0', 'angular-jwt', 'angular-storage'])
	.config(function ($stateProvider, $urlRouterProvider, $httpProvider, authProvider, $locationProvider, jwtInterceptorProvider) {
		$urlRouterProvider.otherwise('/login');

		$stateProvider
		.state('home', {
			url: '/',
			templateUrl: 'app/main/main.html',
			controller: 'MainCtrl',
			data : {
				requiresLogin : true
			}
		})
		.state('login', {
			url : '/login',
			templateUrl: 'app/components/login/login.html',
			controller : 'LoginCtrl'
		})
		.state('logout', {
			url : '/logout',
			templateUrl : 'app/components/login/logout.html',
			controller: 'LogoutCtrl'
		});

		authProvider.init({
			domain : 'emiliot.auth0.com',
			clientID: 'AaR1LO8vpYbnQdy0zYp8bUHpXj5FDXYO',
			callbackUrl: location.href,
			loginState : 'login'
		});

		jwtInterceptorProvider.tokenGetter = function(store){
			return store.get('token');
		};

		$httpProvider.interceptors.push('jwtInterceptor');

	}).run(function($rootScope, auth, store, jwtHelper, $state){
		if(!auth.isAuthenticated){
			var token = store.get('token');
			if(token){
				if(!jwtHelper.isTokenExpired(token)){
					auth.authenticate(store.get('profile'), token);
				}else{
					$state.go('login');
				}
			}
		}
	});
