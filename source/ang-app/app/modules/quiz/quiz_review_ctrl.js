'use strict';
/** Quiz Edit controller  */
angular.module('yunakQuiz.assessments')
.controller('ReviewCtrl', 
  ['$scope','QuizResourceService', 'QuizCommentsService', '$routeParams',
   '$route','$location','QuizMngService', 'getAccess', 
  function($scope, QuizResourceService, QuizCommentsService, $routeParams,
   $route, $location, QuizMngService, getAccess) {

  getAccess($route.current.permision).then(function(data){
    data ? init() : $location.path( "/403" );
  });
  /** get Quiz by ID */
  function init(){
  QuizResourceService.get($routeParams.quiz_id)
      .success(function(data, status, headers, config){
         $scope.quiz = data;
         getComments(data['id']);
      })
      .error(function(data){
        $location.path('/404/');
      });
  };  

  function getComments(quiz_id) {
    QuizCommentsService.get(quiz_id)
      .success(function(data, status, headers, config){
        $scope.comments = data;
      });
  };

  $scope.deleteComment=function(index){
    $scope.comments.splice(index,1);
  };

  $scope.addComment=function(){
    $scope.comments.push({'text':$scope.comment,'quiz_id':$scope.quiz.id});
    $scope.comment='';
  };

  function sendComments(state){
  var service;
  if (state === "published") {
    service = QuizCommentsService.delete($scope.quiz.id);
  }
  else {
   service = QuizCommentsService.update($scope.comments); 
  }
  service
    .success(function(data, status, headers, config) {
      $location.path('/admin/moderationCabinet/');
    })
    .error(function() {
      window.scrollTo(0,0);
      $scope.errorMsg = 'Ваш тест не збережено';
    })

  };
    
  /** save draft Quiz */
  $scope.enhanceQuiz=function(){
    sendQuiz("enhance");
  };

  /** save Quiz for review */
  $scope.publishQuiz=function(){
    sendQuiz("published");
  };

  /** send Quiz to backend  */
  function sendQuiz(state){
    $scope.quiz.status = state;
        
    if(!QuizMngService.validateQuiz($scope.quiz)){
  
      QuizResourceService.update($scope.quiz)
        .success(function(data, status, headers, config) {
          sendComments($scope.quiz.status);
        })
        .error(function() {
            window.scrollTo(0,0);
            $scope.errorMsg = 'Ваш тест не збережено';
        })
    }
  };

  
}]);
