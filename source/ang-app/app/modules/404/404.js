'use strict';

angular.module('yunakQuiz.error', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/404', {
    templateUrl: 'modules/404/404.html',
    // controller: 'ErrorCtrl',
    // controllerAs: "error"
  });
}])

// .controller("ErrorCtrl", ["$location", "$scope", "$http", function($location, $scope, $http){
// }

// ])