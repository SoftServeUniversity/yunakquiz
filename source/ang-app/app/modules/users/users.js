'use strict';

angular.module('yunakQuiz.users', ['ngRoute', 'ngResource'])
.constant("existUser", "has already been taken")
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/auth/signup', {
    templateUrl: 'modules/users/users_new.html',
    controller: 'RegistrationController',
    controllerAs: "reg"
  });
}])
.controller("RegistrationController", ["userService", "$location", "$scope", "userValidationService", "existUser",
  function(userService, $location, $scope, userValidationService, existUser){
    this.user = {};
    var reg = this;
    this.validation = new userValidationService($scope);
    this.emailPattern = /^([\w\-_]+\.?[\w\-_]+)+@([\w\-_]+\.?[\w\-_]+)+\.[a-z]{2,4}$/;
    this.getRandom = function(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    this.captcha = this.getRandom(100, 999);
    this.cancel = function(){
      $location.path("/");
    };
  
    this.submitRegistration = function(){
      $scope.regform.submitted = false;
      if ($scope.regform.$valid && this.captcha == this.enteredCaptcha){
        userService.save(this.user, 
          function(data){
            $location.path("/");    
          }, 
          function(response){
            if (!!response.data.email && response.data.email.indexOf(existUser) !== -1){
              reg.validation.addTakenEmail(reg.user.email);
              reg.user.password = "";
              reg.user.password_confirmation = "";
            }
            if (!!response.data.username && response.data.username.indexOf(existUser) !== -1){
              reg.validation.addTakenUser(reg.user.username);
              reg.user.password = "";
              reg.user.password_confirmation = "";
            }
          });
      } else {
        $scope.regform.submitted = true;
      }
    };
  
}]);
