'use strict';
/** Quiz Create controller  */
angular.module('yunakQuiz.assessments')
.controller('QuizCreateCtrl', 
  ['$scope', 'QuizResourceService', 'QuizMngService', '$location', 
  function($scope, QuizResourceService, QuizMngService, $location) {

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
      QuizResourceService.create($scope.quiz)
      .success(function(data, status, headers, config) {
        $location.path('/admin/personalCabinet/'+state);
      })
      .error(function(data, status, headers, config) {
        window.scrollTo(0,0);
      $scope.errorMsg = 'Ваш тест не збережено';
      });
    };
  };

}]);
