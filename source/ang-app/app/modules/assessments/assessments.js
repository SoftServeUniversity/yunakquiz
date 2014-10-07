'use strict';
/** module for assessments and router  */
var yunakQuizApp = angular.module('yunakQuiz.assessments', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider
  	.when('/assessments/:quiz_id', {
    templateUrl: 'modules/assessments/assessment_show.html',
    controller: 'QuizCtrl',
    })

  	.when('/assessments/:quiz_id/result', {
    templateUrl: 'modules/assessments/assessment_result.html',
    controller: 'AssessmentsResultCtrl'
  })
  ;
   
}]);

