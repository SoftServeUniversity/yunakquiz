'use strict';

angular.module('yunakQuiz.users', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/auth/signup', {
    templateUrl: 'modules/users/users_new.html',
    controller: 'RegistrationController',
    controllerAs: "reg"
  });
}])
.controller("RegistrationController", ["$http", "$location", function($http, $location){
    this.user = {};
    this.cancel = function(){
        $location.path("/");
    };
    this.submitRegistration = function(){
        $http.post("http://localhost:9292/register", this.user)
        .success(function(data){
            $location.path("/");
        });
    };
}]);
