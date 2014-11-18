'use strict';
/** Quiz Create controller  */
yunakQuizApp.controller('QuizCreateCtrl', 
  ['$scope', 'QuizResourceService', 'QuizDataService', '$location', 
  function($scope, QuizResourceService, QuizDataService, $location) {

  QuizDataService.initQuiz();
  $scope.quiz = QuizDataService.quiz;
        
  $scope.saveQuiz=function(){
    sendQuiz("draft");
  };

  $scope.reviewQuiz=function(){
    sendQuiz("review");
  };

  /** Redirect to result-page if quiz is valid  */
  function sendQuiz(state){
    $scope.quiz.status = state;
    if(!QuizDataService.validateQuiz($scope.quiz)){
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
