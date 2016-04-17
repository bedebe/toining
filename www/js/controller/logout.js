'use strict';
angular.module('myApp')
	.controller('LogoutCtrl', function ($scope, Auth, $location, API_URL) {
		/*
		if (!Auth.isAuthenticated) { 
			//return;
			$location.path('/'); 
			return;
		}
		Auth.isAuthenticated = false;
		*/
		var ref = new Firebase(API_URL);
		//Auth.logout();
		ref.unauth();
		$location.path('/#/ingreso');
		

	});