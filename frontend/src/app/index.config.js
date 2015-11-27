(function() {
  'use strict';

  angular
    .module('frontend')
    .config(config);

  /** @ngInject */
  function config($httpProvider, authProvider, jwtInterceptorProvider) {

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
  }

})();
