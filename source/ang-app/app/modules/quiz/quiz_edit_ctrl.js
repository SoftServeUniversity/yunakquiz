'use strict';
/** Quiz Edit controller  */
angular.module('yunakQuiz.assessments')
.controller('QuizEditCtrl', 
  ['$scope', 'QuizResource', 'QuizCommentsService', '$routeParams', '$location', 'QuizMngService', 
  function($scope, QuizResource, QuizCommentsService,$routeParams, $location, QuizMngService) {

  $scope.quiz = QuizResource.get({id:$routeParams.quiz_id}, 
    function (quiz){ getComments(quiz.id); }, 
    function (response){ $scope.errorMsg = response.data || 'Тест не отримано'}
    );

  function getComments(quiz_id) {
    QuizCommentsService.get(quiz_id)
      .success(function(data, status, headers, config){
        $scope.comments = data;
      });
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
