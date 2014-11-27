'use strict';
/** Quiz Edit controller  */
angular.module('yunakQuiz.assessments')
.controller('QuizEditCtrl', 
  ['$scope', 'QuizResource', 'CommentsResource', '$routeParams', '$location', 
   'QuizMngService', 'CONFIG', 'getAccess', '$route', 
  function($scope, QuizResource, CommentsResource, $routeParams, $location, 
    QuizMngService, CONFIG, getAccess, $route) {

  $scope.dateFormat = CONFIG.DATE_FORMAT;

  /** Check access to this page  */
  getAccess('/admin/assessments/edit',$route.current.permission).then(
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
    );
  }
  
  /** send Quiz with draft status */
  $scope.saveQuiz=function(){
    sendQuiz("draft");
  };

  /** send Quiz with review status */
  $scope.reviewQuiz=function(){
    sendQuiz("review");
  };

  /** validate and update Quiz  */
  function sendQuiz(state){
    $scope.quiz.status = state;
    if(!QuizMngService.validateQuiz($scope.quiz)){
      $scope.quiz.$update(success, error);
    };
  };

  /** Quiz save success  */
  function success(value){
    $location.path('/admin/personalCabinet/'+value.status);
  };

  /** Quiz save error  */
  function error(response){
    window.scrollTo(0,0);
    $scope.errorMsg = 'Ваш тест не збережено';
  };

}]);
