'use strict';

angular.module('yunakQuiz.users', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/auth/signup', {
    templateUrl: 'modules/users/users_new.html',
    controller: 'UsersCtrl'
  });
}])

.controller('UsersCtrl', [function() {

}]);