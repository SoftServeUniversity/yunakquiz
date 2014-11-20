'use strict';
/** Quiz Edit controller  */
angular.module('yunakQuiz.assessments')
.controller('QuizReviewCtrl', 
  ['$scope','QuizResource', 'CommentsResource', '$routeParams',
   '$route','$location','QuizMngService', 'getAccess', 
  function($scope, QuizResource, CommentsResource, $routeParams,
   $route, $location, QuizMngService, getAccess) {

  getAccess($route.current.permision).then(function(data){
    data ? init() : $location.path( "/403" );
  });
  /** get Quiz by ID */
  function init(){
    $scope.quiz = QuizResource.get({id:$routeParams.quiz_id}, quizSuccess, quizError);
  };

  function quizSuccess(quiz) {
    $scope.comments = CommentsResource.query({id: quiz.id})
  };
  
  function quizError(response) { 
    $scope.errorMsg = response.data || 'Тест не отримано'
  };

  $scope.addComment=function(){
    $scope.comments.push({'text':$scope.comment,'quiz_id':$scope.quiz.id});
    $scope.comment='';
  };

  $scope.deleteComment=function(index){
    $scope.comments.splice(index,1);
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
      $scope.quiz.$update(sendQuizSuccess, sendQuizError);
    };
  };

  function sendQuizSuccess(value){
    sendComments(value.status);
  };

  function sendQuizError(response){
    window.scrollTo(0,0);
    $scope.errorMsg = 'Ваш тест не збережено';
  }

  function sendComments(state){
    if (state === "published"){
      CommentsResource.delete({id:$scope.quiz.id}, sendCommentsSuccess, sendCommentsError);
    } 
    else {
      CommentsResource.save(
        {id:$scope.quiz.id}, 
        {comments: $scope.comments}, 
        sendCommentsSuccess, sendCommentsError
      );
    }
  };

  function sendCommentsSuccess(){
    $location.path('/admin/moderationCabinet/'+$scope.quiz.status);
  };

  function sendCommentsError(){
    window.scrollTo(0,0);
    $scope.errorMsg = 'Коментарі не збережено';
  };
  
}]);
