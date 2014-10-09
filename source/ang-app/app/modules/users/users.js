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
  $scope.getRandom = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  $scope.captcha = $scope.getRandom(100, 999);
  this.cancel = function(){
    $location.path("/");
  };
  this.checkPassword = function () {
    $scope.regform.password_confirmation.$error.dontMatch = $scope.regform.password.$viewValue !== $scope.regform.password_confirmation.$viewValue;
  };
  this.submitRegistration = function(){
    $scope.regform.submitted = false;
    console.log($scope.captcha == $scope.enteredCaptcha);
    if ($scope.regform.$valid && $scope.captcha == $scope.enteredCaptcha) {
      $http.post("http://localhost:9292/register", this.user)
        .success(function(data){
          $location.path("/");
        });
    } else {
      $scope.regform.submitted = true;
    }
  };
}]);
