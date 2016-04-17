'use strict';
angular.module('myApp')
	.controller('LoginCtrl', function (API_URL, $scope, $location, Auth) {
		$scope.sigin = function(){
			
			var ref = new Firebase(API_URL);
			
			
			ref.authWithOAuthPopup("facebook", function(error, authData) {
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
		}
	});
