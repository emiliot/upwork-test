(function() {
	'use strict';

	angular
	.module('frontend')
	.run(runBlock);

	/** @ngInject */
	function runBlock($log, $rootScope, auth, store, jwtHelper, $state, $window) {

		// validate logged users
		var locationEventCallback = $rootScope.$on('$locationChangeStart', function(){
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

		$rootScope.$on('$destroy', locationEventCallback);

		$window.Stripe.setPublishableKey('pk_test_TmnSCKiAVHL7BhHmcQJvYYN4');
	}

})();
