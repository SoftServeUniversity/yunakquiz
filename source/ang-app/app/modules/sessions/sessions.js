'use strict';

angular.module('yunakQuiz.sessions', ['ngRoute'])
.controller("SessionsCtrl", ["$location", "$scope", "$http", function($location, $scope, $http){
	var lgnCtrl = this;
	this.user = {};
	this.message = "";
	this.submitLogin = function(){
		if (!this.user.username || !this.user.password){
			this.message = "Enter username and password!";
		} else {
			$http.post("http://localhost:9292/login", this.user)
				.success(function(data){
					$("#login").modal("hide");
					$location.path("/");
					$scope.$emit("user_logged_in", data);
				})
				.error(function(data){
					lgnCtrl.message = "Invalid username and/or password!";
				});
		}
	};
	this.register = function(){
		$("#login").modal("hide");
		$location.path("/auth/signup");
	};
}])
.directive("login", function(){
	return {
		restrict: "E",
		templateUrl: "modules/sessions/sessions_new.html",
		controller: "SessionsCtrl",
		controllerAs: "lgn"
	};
});
