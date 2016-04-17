'use strict';
angular.module('myApp')
	.controller('ChatCtrl', function (API_URL, $scope, $location, Auth, $routeParams) {
		console.log("chat")
		var ref = new Firebase(API_URL);
		var alias = $routeParams.alias;
		$scope.id_user_to = "";
		ref.child("alias/"+alias).once("value", function(snapshot){
			if(!snapshot.val()){
				console.log("no existe este usuario")
				return;
			}else{
				$scope.id_user_to = snapshot.val();
				if(!$scope.$$phase) {
					//$digest or $apply
					$scope.$apply();
				}
			}
			
		})

		$scope.messages = {};
		$scope.new_message = {};

		
		
		
		$scope.alias;
		var authData = ref.getAuth();
		if (!authData) {
		  	
		  	return;
		}
		var id_user = authData.uid;

		$scope.my_alias = ""
		
		ref.child("users/"+id_user+"/alias").once("value", function(snapshot){
			if(snapshot.val()){
				$scope.my_alias = snapshot.val();
				if(!$scope.$$phase) {
				  //$digest or $apply
				  $scope.$apply();
				}
			}
		})
		

		ref.child("talks/"+alias+"/"+id_user).on("value", function(snapshot){
			$scope.messages = snapshot.val();
			if(!$scope.$$phase) {
			  //$digest or $apply
			  $scope.$apply();
			}
		})
		
		$scope.save = function(){
			var new_message = $scope.new_message;
			var id_user_to = $scope.id_user_to;
			console.log(id_user_to)
			new_message.float = "right";
			ref.child("talks/"+alias+"/"+id_user).push(new_message, function(error){
				if(!error){
					console.log("mensaje guardado")
				}
			})
			//En el destinatario escribo la cantidad de mensajes no leidos

			var my_alias = $scope.my_alias;
			
			if(my_alias != "" && id_user_to != ""){
				new_message.float = "left";
				ref.child("talks/"+my_alias+"/"+id_user_to).push(new_message, function(error){
					if(!error){
						console.log("mensaje guardado")
					}
				})
			}


			/**/
			var unread;
			var info = {};
			//ref.child("users/"+id_user_to+"/talks/"+my_alias+"/unread").once("value",function (value) {
			ref.child("users/"+id_user_to+"/talks").orderByChild("contact_id").startAt(id_user).endAt(id_user).once("value", function(snapshot){
			  	//return (current_value || 0) + 1;
				//console.log(id_user_to+" "+id_user+" "+JSON.stringify(snapshot.val()))
				
				
				var key;
				var child_data;
			  	if(!snapshot.val()){
			  		info.unread = 1;
			  	}else{
			  		
			  		
			  		snapshot.forEach(function(child_snapshot) {
					    key = child_snapshot.key();
					    child_data = child_snapshot.val();
					    info.unread = child_data.unread + 1;
					});
					
			  	}
			  	
			  	info.datetime = Firebase.ServerValue.TIMESTAMP;
			  	info.contact_name = my_alias;
			  	info.contact_id = id_user;
			  	if(!snapshot.val()){
			  		ref.child("users/"+id_user_to+"/talks").push(info)
			  	}else{
			  		ref.child("users/"+id_user_to+"/talks/"+key).remove(function(error){
			  			if(!error){
			  				ref.child("users/"+id_user_to+"/talks").push(info)
			  			}
			  		})
			  		//ref.child("users/"+id_user_to+"/talks").push(info)
			  	}
			  	
			  	//ref.child("users/"+id_user_to+"/talks/"+my_alias).set(info)
			});
			$scope.new_message = {}
		}
		
		/*Sistema de permanencia*/
		var myConnectionsRef = ref.child("users/"+id_user+"/connections");
		var lastOnlineRef = ref.child("users/"+id_user+"/lastOnline");
		var connectedRef = ref.child(".info/connected");
		connectedRef.on('value', function(snap) {
		  if (snap.val() === true) {
		    
		    var con = myConnectionsRef.push(true);
		   
		    con.onDisconnect().remove();
		   
		    lastOnlineRef.onDisconnect().set(Firebase.ServerValue.TIMESTAMP);
		  }
		});

	});
