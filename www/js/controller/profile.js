'use strict';
angular.module('myApp')
	.controller('ProfileCtrl', function ($scope, API_URL) {
		console.log("perfil")
		var ref = new Firebase(API_URL);
		$scope.alias;
		var authData = ref.getAuth();
		if (!authData) {
		  	
		  	return;
		}
		/*
		var onComplete = function(error){
			if(error){
				console.log("error")
			}else{
				console.log("bien")
			}
		}
		*/
		$scope.send = function(){
			var alias = $scope.alias;
			ref.child("users/"+authData.uid+"/alias").once("value", function(snapshot){
				if(!snapshot.val()){
					ref.child("alias/"+alias).once("value", function(snapshot){
						//console.log(JSON.stringify(snapshot.val()))
						if(!snapshot.val()){
							ref.child("alias/"+alias).set(authData.uid, function(error){
								if(error){
									console.log("error")
								}else{
									ref.child("users/"+authData.uid+"/alias").set(alias, function(error){
										if(error){
											console.log("error")
										}else{
											
											console.log("bien")
										}
									})
								}
							})
						}else{
							console.log("Alias no disponible")
						}
					})
				}else{
					console.log("El usuario ya tiene un alias. Solo uno por persona!")
				}
			})
			
			
		}
		

	});
