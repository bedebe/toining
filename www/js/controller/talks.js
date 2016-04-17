'use strict';
angular.module('myApp')
	.controller('TalksCtrl', function ($scope, API_URL) {
		console.log("talksrrrr")
		var ref = new Firebase(API_URL);
		//Obtengo el id del usuario
		var authData = ref.getAuth();
		if (!authData) {
		  	
		  	return;
		}

		var id_user = authData.uid;
		console.log(id_user)
		//Obtengo las conversaciones del usuario
		$scope.talks = {};
		ref.child("users/"+id_user+"/talks").on("value", function(snapshot){
			$scope.talks = snapshot.val();
			console.log(id_user+" "+JSON.stringify($scope.talks))
			if(!$scope.$$phase){
				$scope.$apply();
			}
		})
	});

