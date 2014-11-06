'use strict';

// Declare app level module which depends on views, and components
angular.module('yunakQuiz', [
  'ngRoute',
  // 'yunakQuiz.measures',
  // 'yunakQuiz.assessments',
  'yunakQuiz.users',
  'yunakQuiz.sessions',
  'yunakQuiz.version',
  'yunakQuiz.headerMenu',
  // 'yunakQuiz.error',
  // 'yunakQuiz.guestSearch',
  // 'yunakQuiz.statistics',
  // 'yunakQuiz.staticPartialsRoute',
  // 'yunakQuiz.categoriesContainer',

  'yunakQuiz.admin',

  'yunakQuiz.subcategory'
])
.config(['$routeProvider', '$httpProvider',     
  	  function($routeProvider, $httpProvider) {
    		$httpProvider.defaults.withCredentials = true;
        $routeProvider.
      		  when('/', {
        		templateUrl: 'modules/partials/home-page-greetings.html',
      		  }).

            when('/404', {
            templateUrl: 'modules/404/404.html',
            }).

      		  otherwise({
        	  redirectTo: '/'
      });
  }])

.controller("ApplicationController", ["$http", "$scope", function($http, $scope){
	var app = this;
	this.username = "";
	// $http.get("http://localhost:9292/access",{ withCredentials: true})
  $http.get("http://localhost:9292/access")
		.success(function(data){
			app.username = data;
		}).error(function(){
			app.username = undefined;
		});
	$scope.$on("user_logged_in", function(event, data){
		app.username = data;
	});
	this.userLoggedIn = function(){
		return (this.username != "") && (this.username != undefined);
	};
	this.logout = function(){
		$http.post("http://localhost:9292/logout")
			.success(function(data){
				app.username = undefined;
			});
	};
}]);

