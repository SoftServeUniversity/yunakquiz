'use strict';
/** Quiz controller  */
angular.module('yunakQuiz.assessments')
.controller('QuizShowCtrl', 
  ['$scope','QuizPassService', '$routeParams', '$location', 
  function($scope, QuizPassService, $routeParams, $location) {

  /** get Quiz by Id */
  QuizPassService.getQuiz($routeParams.quiz_id)
    .success(function(data, status, headers, config){
      $scope.quiz = QuizPassService.initQuiz(data);
      $scope.quiz.parentCategory = QuizPassService.quiz.category.category;
    })
    .error(function(data){
      $location.path('/404/');
    });

  /** Mark answer and validate question  */
  $scope.checkAnswer = function(answer,question){
    answer.checked = !answer.checked;
    QuizPassService.validateQuestion(question);
  };

  /** Redirect to result-page if quiz is valid  */
  $scope.passQuiz = function(){
    if (QuizPassService.validateQuiz()) {
      QuizPassService.submitQuiz()
      .success(function(){
        window.scrollTo(0,0);
        $location.path($location.path()+'/result'); 
      })
      .error(function(data){
        $location.path('/404/');
      });
    }
  };

}]);
