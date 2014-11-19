'use strict';
/** Quiz Create controller  */
angular.module('yunakQuiz.assessments')
.controller('QuizCreateCtrl', 
  ['$scope', 'QuizResource', 'QuizMngService', '$location', 
  function($scope, QuizResource, QuizMngService, $location) {

  QuizMngService.initQuiz();
  $scope.quiz = QuizMngService.quiz;
        
  $scope.saveQuiz=function(){
    sendQuiz("draft");
  };

  $scope.reviewQuiz=function(){
    sendQuiz("review");
  };

  /** Redirect to result-page if quiz is valid  */
  function sendQuiz(state){
    $scope.quiz.status = state;
    if(!QuizMngService.validateQuiz($scope.quiz)){
        $scope.quiz.$save(success, error);
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
