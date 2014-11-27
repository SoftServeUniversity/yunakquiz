'use strict';
/** Quiz Create controller  */
angular.module('yunakQuiz.assessments')
.controller('QuizCreateCtrl', 
  ['$scope', 'QuizResource', 'QuizMngService', '$location', 'getAccess', '$route',
  function($scope, QuizResource, QuizMngService, $location,getAccess, $route ) {

  /** Check access to this page*/
  getAccess($location.path(),$route.current.permission).then(
    function () { init(); },
    function () { $location.path( "/404" ); }
  );

  /** Init new Quiz */
  function init(){
    $scope.quiz = QuizMngService.initQuiz();
  }; 

  /** Send Quiz with draft status */
  $scope.saveQuiz=function(){
    sendQuiz("draft");
  };

  /** Send Quiz with review status */
  $scope.reviewQuiz=function(){
    sendQuiz("review");
  };

  /** Validate and save Quiz  */
  function sendQuiz(state){
    $scope.quiz.status = state;
    if(!QuizMngService.validateQuiz($scope.quiz)){
        $scope.quiz.$save(success, error);
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
  }

}]);
