(function() {
	'use strict';

	angular
	.module('frontend')
	.controller('MainController', MainController);

	/** @ngInject */
	function MainController($http, store, $log, $scope) {
		var vm = $scope;
		vm.transactions = [];
		vm.user = store.get('profile');
		vm.paymentOptions = [
		{
			amount : 1000,
			text : '10$'
		},
		{
			amount : 10000,
			text : '100$'
		}
		];
		vm.paymentSelected = vm.paymentOptions[0];

		vm.getTransactions = function(){
			var email = vm.user.email;
			$http({
				url : 'https://infinite-spire-2507.herokuapp.com/users',
				method : 'GET',
				params : {
					email : email
				}
			}).then(function(response){
				vm.transactions = response.data.transactions;
			}, function(response){
				$log.error(response.data);
			});
		};
		vm.getTransactions();

		vm.stripeCallback = function(code, result){
			if(result.error){
				$log.error(result);
			}else{
				var email = vm.user.email;
				$http({
					url : 'https://infinite-spire-2507.herokuapp.com/users/pay',
					method : 'POST',
					headers : {
						'Content-type' : 'application/json'
					},
					data : {
						stripeToken : result.id,
						email : email,
						amount : vm.paymentSelected.amount
					}

				}).then(function(response){
					vm.transactions.push(response.data.transaction);
				}, function(response){
					$log.error(response.data);
				});
			}
		};
	}
})();
