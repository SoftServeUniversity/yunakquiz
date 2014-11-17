'use strict';
/** Quiz controller  */
yunakQuizApp.controller('QuizCtrl', 
  ['$scope','QuizService', '$routeParams', '$location', 'QuizData',
  function($scope,QuizService, $routeParams, $location, QuizData) {
  
  /** get quiz by _id from QuizData service  */
  QuizService.getQuiz($routeParams.quiz_id)
    .success(function(data, status, headers, config){
      QuizService.quiz = data;
      $scope.quiz = QuizService.quiz;
      $scope.quiz.parentCategory = QuizService.quiz.category.category;
    })
    .error(function(data){
      $location.path('/404/');
    });

  /** mark checked answers, and call validate function  */
  $scope.checkAnswer = function(answer,question){
    answer.checked = !answer.checked;
    QuizService.validateQuestion(question);
  };

  /** Redirect to result-page if quiz is valid  */
  $scope.passQuiz = function(){
    if (QuizService.validateQuiz()) {
      QuizService.submitQuiz().success(function(){
        $location.path($location.path()+'/result'); 
      })
      .error(function(data){
        $location.path('/404/');
      });
    }
  };

}]);
