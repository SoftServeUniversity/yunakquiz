'use strict';
/** Quiz Edit controller  */
yunakQuizApp.controller('QuizEditCtrl', 
  ['$scope','QuizResourceService', 'QuizCommentsService', '$routeParams', '$location', 'QuizDataService', 
  function($scope, QuizResourceService, QuizCommentsService,$routeParams, $location, QuizDataService) {

  /** get Quiz by ID */
  QuizResourceService.get($routeParams.quiz_id)
      .success(function(data, status, headers, config){
         $scope.quiz = data;
         getComments(data['id']);
      })
      .error(function(data){
        $location.path('/404/');
      });
    

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
        
    if(!QuizDataService.validateQuiz($scope.quiz)){
      QuizResourceService.update($scope.quiz)
      .success(function(data, status, headers, config) {
        $location.path('/admin/personalCabinet/'+state);
      })
      .error(function(data, status, headers, config) {
        window.scrollTo(0,0);
        $scope.errorMsg = 'Ваш тест не збережено';
      });
    }
  };

}]);
