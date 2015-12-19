'use strict';

angular.module('yunakQuiz.sessions', ['ngRoute', "ngResource"])
.controller("SessionsCtrl", ["$location", "$scope", "accessService", 
  function($location, $scope, accessService){
    var lgnCtrl = this;
    this.user = {};
    this.message = "";
    this.submitLogin = function(){
      if (!this.user.username || !this.user.password){
        this.message = "Введіть нікнейм і пароль!";
      } else {
        accessService.save(this.user,
          function(data){
            $("#login").modal("hide");
            $location.path("/");
            $scope.$emit("user_logged_in", data);
          },
          function(data){
            lgnCtrl.message = "Не валідний нік і/або пароль!";
            lgnCtrl.user = {};
          });
      }
    };
    this.clearFields = function(){
        this.message = "";
        this.user = {};
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
