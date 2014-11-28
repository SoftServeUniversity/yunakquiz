'use strict';
/** module for assessments and router  */
angular.module('yunakQuiz.assessments', ['yunakQuiz.constants'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider
  	.when('/assessments/:quiz_id', {
    templateUrl: 'modules/quiz/quiz_show.html',
    controller: 'QuizShowCtrl',
    })
    .when('/assessments/:quiz_id/result', {
    templateUrl: 'modules/quiz/quiz_result.html',
    controller: 'QuizResultCtrl'
  })
    .when('/admin/assessments/create', {
    templateUrl: 'modules/quiz/quiz_create.html',
    controller: 'QuizCreateCtrl'
  })
    .when('/admin/assessments/:quiz_id/', {
    templateUrl: 'modules/quiz/quiz_edit.html',
    controller: 'QuizEditCtrl'
  })
    .when('/admin/assessments/review/:quiz_id', {
    templateUrl: 'modules/quiz/quiz_review.html',
    controller: 'QuizReviewCtrl',
    permision: "moderationCabinet"
  }) ;
}]);

