'use strict';

angular.module('yunakQuiz.measures', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/measures', {
    templateUrl: 'modules/measures/measures_index.html',
    controller: 'MeasuresCtrl'
  });
}])

.controller('MeasuresCtrl', [function() {

}]);