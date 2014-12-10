'use strict';

angular.module('yunakQuiz.sessions', ['ngRoute', "ngResource",'yunakQuiz.permission'])
.controller("SessionsCtrl", ["$location", "$scope", "accessService", 'getTabTemplates',
  function($location, $scope, accessService, getTabTemplates){
    var lgnCtrl = this;
    this.user = {};
    this.message = "";
    this.validateInputs = function(){
      if (!this.user.username || !this.user.password){
        this.message = "Введіть нікнейм і пароль!";
        return false;
      }else{
        return true;
      }  
    };
    this.submitLogin = function(){
      if (this.validateInputs()){
        accessService.save(this.user,
          function(data){
            getTabTemplates.getResponse().then(function(){
            $("#login").modal("hide");
            $location.path("/");
            lgnCtrl.user = {};
            $scope.$emit("user_logged_in", data);
          });
          },
          function(data){
            if (data.data == "User is blocked!"){
              lgnCtrl.message ="Нажаль, цей аккаунт заблоковано";
              lgnCtrl.user = {};
            }
            else if (data.data == "unauthorized"){
              lgnCtrl.message = "Не валідний нік і/або пароль!";
              lgnCtrl.user = {};
            }
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
