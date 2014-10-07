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
  this.cancel = function(){
    $location.path("/");
  };
  this.checkPassword = function () {
    $scope.regform.password_confirmation.$error.dontMatch = $scope.regform.password.$viewValue !== $scope.regform.password_confirmation.$viewValue;
  };
  this.submitRegistration = function(){
    $scope.regform.submitted = false;
    if ($scope.regform.$valid) {
      $http.post("http://localhost:9292/register", this.user)
        .success(function(data){
          $location.path("/");
        });
    } else {
      $scope.regform.submitted = true;
    }
  };
}]);
