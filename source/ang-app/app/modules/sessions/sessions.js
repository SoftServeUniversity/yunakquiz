'use strict';

angular.module('yunakQuiz.sessions', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/auth/login', {
    templateUrl: 'modules/sessions/sessions_new.html',
    controller: 'SessionsCtrl'
  });
}])

.controller('SessionsCtrl', [function() {

}]);