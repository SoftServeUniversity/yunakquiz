'use strict';
/** Quiz controller  */
angular.module('yunakQuiz.assessments')
.controller('QuizShowCtrl', 
  ['$scope','QuizPassService', '$routeParams', '$location', 
  function($scope, QuizPassService, $routeParams, $location) {

  /** get quiz by _id from  service  */
  QuizPassService.getQuiz($routeParams.quiz_id)
    .success(function(data, status, headers, config){
      QuizPassService.quiz = data;
      $scope.quiz = QuizPassService.quiz;
      $scope.quiz.parentCategory = QuizPassService.quiz.category.category;
    })
    .error(function(data){
      $location.path('/404/');
    });

  /** mark checked answers, and call validate function  */
  $scope.checkAnswer = function(answer,question){
    answer.checked = !answer.checked;
    QuizPassService.validateQuestion(question);
  };

  /** Redirect to result-page if quiz is valid  */
  $scope.passQuiz = function(){
    if (QuizPassService.validateQuiz()) {
      QuizPassService.submitQuiz().success(function(){
        $location.path($location.path()+'/result'); 
      })
      .error(function(data){
        $location.path('/404/');
      });
    }
  };

}]);
