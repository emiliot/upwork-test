'use strict';

angular.module('frontend')
.controller('MainCtrl', function ($scope, auth) {
	auth.profilePromise.then(function(){
		$scope.$parent.message = 'Welcome ' + auth.profile.name + '!';
		console.log($scope.$parent.message);
	});

	$scope.auth = auth;
});
