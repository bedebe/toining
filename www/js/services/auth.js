'use strict';
angular.module('myApp')
.factory('Auth', function(API_URL){
	var auth = {};
	/*
	auth.login = function(token){
		$cookies.put('token', token);
	}
	auth.logout =function(){
		$cookies.remove("token")
	}
	*/
	auth.isAuthenticated = function(){
		var ref = new Firebase(API_URL);
		var authData = ref.getAuth();
		if (authData) {
		  return true;
		} else {
		  return false;
		}
	};
	return auth;
})