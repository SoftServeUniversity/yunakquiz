'use strict';
/** Quiz Edit controller  */
angular.module('yunakQuiz.assessments')
.controller('QuizReviewCtrl', 
  ['$scope','QuizResource', 'CommentsResource', '$routeParams',
   '$route','$location','QuizMngService', 'getAccess','CONFIG', 
  function($scope, QuizResource, CommentsResource, $routeParams,
   $route, $location, QuizMngService, getAccess,CONFIG) {

  $scope.dateFormat = CONFIG.DATE_FORMAT;
  
  /** Check access to this page */
  getAccess('/admin/assessments/review', $route.current.permission).then(
    function () { init(); },
    function () { $location.path( "/404" ); }
  );

  /** Initiate Quiz by Id and load comments */
  function init(){
    $scope.quiz = QuizResource.get({id:$routeParams.quiz_id}, 
      function (quiz) {
        $scope.comments = CommentsResource.get({id: quiz.id});
      },
      function (response) { 
       $scope.errorMsg = response.data || 'Тест не отримано'
      }
    )
  };
 
  /** Add new comments */
  $scope.addComment=function(){
    $scope.comments.arr.push({'text':$scope.newComments});
    $scope.newComments='';
  };

  /** Delete newly added comment */
  $scope.deleteComment=function(index){
    $scope.comments.arr.splice(index,1);
  };

  /** Send Quiz with enhance status */
  $scope.enhanceQuiz=function(){
    sendQuiz("enhance");
  };

  /** Send Quiz with review status */
  $scope.publishQuiz=function(){
    sendQuiz("published");
  };

  /** Update Quiz on backend  */
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
  };

  /** Delete comments if Quiz is published or save them */
  function sendComments(state){
    if (state === "published") {
      $scope.comments.$delete(sendCommentsSuccess, sendCommentsError);
    }
    else {
      $scope.comments.$save(sendCommentsSuccess, sendCommentsError);
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
