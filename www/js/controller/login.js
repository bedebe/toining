'use strict';
angular.module('myApp')
	.controller('LoginCtrl', function (API_URL, $scope, $location, Auth) {
		console.log("biennnnnnnnsssssss")
		var ref = new Firebase(API_URL);
		function authDataCallback(authData) {
		  if (authData) {
		    console.log(JSON.stringify(authData));
			var auth = {};
			auth.email = authData.facebook.email;
			auth.img_profile = authData.facebook.profileImageURL;
			auth.full_name = authData.facebook.displayName;
			auth.first_name = authData.facebook.cachedUserProfile.first_name;
			auth.last_name = authData.facebook.cachedUserProfile.last_name;
			auth.gender = authData.facebook.cachedUserProfile.gender;
			auth.locale = authData.facebook.cachedUserProfile.locale;
			auth.timezone = authData.facebook.cachedUserProfile.timezone;
			var onComplete = function(error){
				if(error){
					console.log("error")
				}else{
					console.log("bien")
				}
			}
			ref.child("people").child(authData.uid).set(auth, onComplete)
			

			window.location.href = "/#/talks";
			console.log("biennnnnnnn")
		  } else {
		    console.log("User is logged out");
		  }
		}
		// Register the callback to be fired every time auth state changes
		
		ref.onAuth(authDataCallback);
		$scope.sigin = function(){
			
			
			ref.authWithOAuthPopup("facebook", function(error, authData) {
			  if (error) {
			    if (error.code === "TRANSPORT_UNAVAILABLE") {
			      // fall-back to browser redirects, and pick up the session
			      // automatically when we come back to the origin page
			      ref.authWithOAuthRedirect("facebook", function(error) { /* ... */ });
			    }
			  } else if (authData) {
			    // user authenticated with Firebase
			  }
			},
			{
				scope: "email,user_likes"
			})
			/*
			//ref.authWithOAuthPopup("facebook", function(error, authData) {
			ref.authWithOAuthRedirect("facebook", function(error, authData) {
				//console.log("face")
				if (error) {
					console.log("Login Failed!", error);
				} else {
				
					console.log(JSON.stringify(authData));
					var auth = {};
					auth.email = authData.facebook.email;
					auth.img_profile = authData.facebook.profileImageURL;
					auth.full_name = authData.facebook.displayName;
					auth.first_name = authData.facebook.cachedUserProfile.first_name;
					auth.last_name = authData.facebook.cachedUserProfile.last_name;
					auth.gender = authData.facebook.cachedUserProfile.gender;
					auth.locale = authData.facebook.cachedUserProfile.locale;
					auth.timezone = authData.facebook.cachedUserProfile.timezone;
					var onComplete = function(error){
						if(error){
							console.log("error")
						}else{
							console.log("bien")
						}
					}
				
				}
				//Auth.login(authData.token);
				
				ref.child("people").child(authData.uid).set(auth, onComplete)
				

				window.location.href = "/#/talks";
				
			},
			{
				scope: "email,user_likes"
			})
			*/

		}
	});
