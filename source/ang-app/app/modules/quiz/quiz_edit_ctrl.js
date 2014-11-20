'use strict';
/** Quiz Edit controller  */
angular.module('yunakQuiz.assessments')
.controller('QuizEditCtrl', 
  ['$scope', 'QuizResource', 'CommentsResource', '$routeParams', '$location', 'QuizMngService', 
  function($scope, QuizResource, CommentsResource, $routeParams, $location, QuizMngService) {

  $scope.quiz = QuizResource.get({id:$routeParams.quiz_id}, quizSuccess, quizError);
  
  function quizSuccess(quiz) {
    $scope.comments = CommentsResource.query({id: quiz.id})
  };
  
  function quizError(response) { 
    $scope.errorMsg = response.data || 'Тест не отримано'
  };

  /** save draft Quiz */
  $scope.saveQuiz=function(){
    sendQuiz("draft");
  };

  /** save Quiz for review */
  $scope.reviewQuiz=function(){
    sendQuiz("review");
  };

  /** send Quiz to backend  */
  function sendQuiz(state){
    $scope.quiz.status = state;
    if(!QuizMngService.validateQuiz($scope.quiz)){
      $scope.quiz.$update(success, error);
    };
  };

  function success(value){
    $location.path('/admin/personalCabinet/'+value.status);
  };

  function error(response){
    window.scrollTo(0,0);
    $scope.errorMsg = 'Ваш тест не збережено';
  }

}]);
