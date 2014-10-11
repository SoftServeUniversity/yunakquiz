'use strict';

angular.module('yunakQuiz.users', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/auth/signup', {
    templateUrl: 'modules/users/users_new.html',
    controller: 'RegistrationController',
    controllerAs: "reg"
  });
}])
.controller("RegistrationController", ["$http", "$location", "$scope", function($http, $location, $scope){
  this.user = {};
  this.alreadyTakenUsernames = [];
  this.cancel = function(){
    $location.path("/");
  };
  this.checkPassword = function () {
    var passwordField = $scope.regform.password;
    var confirmationField = $scope.regform.password_confirmation;
    if (passwordField.$viewValue !== confirmationField.$viewValue){
      confirmationField.$setValidity('dontMatch', false);
    } else {
      confirmationField.$setValidity('dontMatch', true);
    }
  };
  this.submitRegistration = function(){
    $scope.regform.submitted = false;
    if ($scope.regform.$valid) {
      $http.post("http://localhost:9292/register", this.user)
        .success(function(data){
          $location.path("/");
        })
        .error(function(response, status, headers, config){
          if (!!response.username && response.username.indexOf('has already been taken') !== -1){
            reg.alreadyTakenUsernames.push(reg.user.username);
            reg.checkUsernameUniqueness();
          } 
        });    
    } else {
      $scope.regform.submitted = true;
    }
  };
  this.checkUsernameUniqueness = function(){
    var usernameField = $scope.regform.username;
    if (usernameField.$error.required || usernameField.$error.minlength){
      usernameField.$setValidity('unique', true);
      return;
    }
    if (this.alreadyTakenUsernames.indexOf(usernameField.$viewValue) === -1){
      usernameField.$setValidity('unique', true);
    } else {
      usernameField.$setValidity('unique', false);
    }
  };
}]);
