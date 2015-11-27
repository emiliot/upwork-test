(function() {
	'use strict';

	angular
		.module('frontend')
		.config(routerConfig);

	/** @ngInject */
	function routerConfig($stateProvider, $urlRouterProvider) {
		$stateProvider.state('home', {
			url: '/',
			templateUrl: 'app/main/main.html',
			controller: 'MainController as MainController',
			data : {
				requiresLogin : true
			}
		})
		.state('login', {
			url : '/login',
			templateUrl: 'app/components/login/login.html',
			controller : 'LoginController as LoginController'
		})
		.state('logout', {
			url : '/logout',
			templateUrl : 'app/components/login/logout.html',
			controller: 'LogoutController as LogoutController'
		});

		$urlRouterProvider.otherwise('/login');
	}

})();
