'use strict';

angular.module('yunakQuiz.assessments', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/assessments/:assessment_id', {
    templateUrl: 'modules/assessments/assessment_show.html',
    controller: 'AssessmentsCtrl'
  });
}])

.controller('AssessmentsCtrl', [function() {

}]);