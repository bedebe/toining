'use strict';
angular.module('myApp', [
        'ngRoute'
    ])
    //Agrego la url del api
    //.constant('API_URL', 'http://api-percibido.azurewebsites.net/')
    .constant('API_URL', 'https://toining-api.firebaseio.com')
    .config(function ($routeProvider) {
        
        $routeProvider
        .when('/', {
            templateUrl: 'views/talks.html',
            controller: 'TalksCtrl',
            resolve:{
                loginRequired: loginRequired
            }
        })
        .when('/ingreso', {
            templateUrl: 'views/login.html',
            controller: 'LoginCtrl',
            resolve:{
                skipIfLoggedIn: skipIfLoggedIn
            }
        })
        .when('/registro', {
            templateUrl: 'views/signup.html',
            controller: 'SignupCtrl',
            resolve:{
                skipIfLoggedIn: skipIfLoggedIn
            }
        })
        .when('/perfil', {
            templateUrl: 'views/profile.html',
            controller: 'ProfileCtrl',
            resolve:{
                loginRequired: loginRequired
            }
        })
        .when('/movimiento', {
            templateUrl: 'views/record.html',
            controller: 'RecordCtrl',
            resolve:{
                loginRequired: loginRequired
            }
        })
        .when('/chat/:alias?', {
            templateUrl: 'views/chat.html',
            controller: 'ChatCtrl',
            resolve:{
                loginRequired: loginRequired
            }
        })
        .when('/talks', {
            templateUrl: 'views/talks.html',
            controller: 'TalksCtrl',
            resolve:{
                loginRequired: loginRequired
            }
        })
        .when('/salir', {
            template: null,
            controller: 'LogoutCtrl'
        })
        .otherwise({
            redirectTo: '/talks'
        });
        function skipIfLoggedIn($q, $location, Auth) {

            var deferred = $q.defer();
            if (Auth.isAuthenticated()) {
                deferred.reject();
                $location.path('talks');
            } else {
                deferred.resolve();
            }
            return deferred.promise;
        }
        function loginRequired($q, $location, Auth) {
            var deferred = $q.defer();
            if (Auth.isAuthenticated()) {
                console.log("si")
                deferred.resolve();
                
            } else {
                console.log("no")
                $location.path('/ingreso');
                
            }
            return deferred.promise;
        }
        /*
        function skipIfLoggedIn($q, $auth) {

            var deferred = $q.defer();
            if ($auth.isAuthenticated()) {
                deferred.reject();
            } else {
                deferred.resolve();
            }
            return deferred.promise;
        }
        function loginRequired($q, $location, $auth) {
            var deferred = $q.defer();
            if ($auth.isAuthenticated()) {
                deferred.resolve();
            } else {
                $location.path('/login');
            }
            return deferred.promise;
        }
        */
        
    });
