'use strict';
angular.module('myApp')
	.controller('SignupCtrl', function ($scope, $auth, $location) {
		$scope.signup = function() {
			$auth.signup($scope.user)
			.then(function(response) {
				$auth.setToken(response);
				$location.path('/');
				
			})
			.catch(function(response) {
				
			});
		};

	});
