'use strict';
/** Quiz Create controller  */
yunakQuizApp.controller('QuizCreateCtrl', 
  ['$scope','QuizDataService', '$location','QuizValidation', 
  function($scope, QuizDataService, $location, QuizValidation) {

  // $scope.quiz = {};
  QuizDataService.initQuiz();
  $scope.quiz = QuizDataService.quiz;
        
  $scope.saveQuiz=function(){
    $scope.sendQuiz("draft");
  };

  $scope.reviewQuiz=function(){
    $scope.sendQuiz("review");
  };

  /** Redirect to result-page if quiz is valid  */
  $scope.sendQuiz = function(state){
    $scope.quiz.category_id = $scope.selectedSubcat.id;
    if(!QuizValidation($scope.quiz.questions)){
      $scope.quiz.status = state;
      
      QuizData.create($scope.quiz)
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
