'use strict';
/** Quiz Create controller  */
yunakQuizApp.controller('QuizCreateCtrl', ['$scope','QuizData','tags', '$location','QuizValidation', function($scope, QuizData,tags, $location, QuizValidation) {

  // QuizData.getTags().success(function(data, status, headers, config) {
  //   $scope.tags=data;        
  // });

  $scope.loadTags = function(query) {
      return QuizData.getTags(query)
  };

  $scope.getCat = function(){
    QuizData.getCat().success(function(data, status, headers, config) {
          $scope.categories=data;        
      });
  };

  $scope.clearSubcat = function(){
    $scope.selectedSubcat='';
  };

  $scope.init = function() {
    
    $scope.quiz = {};
    $scope.quiz.questions = [];
    $scope.addQuestion();
    $scope.getCat();
  };

  $scope.addAnswer = function(question) {
    question.answers.push({correct:false});
  };

  $scope.deleteAnswer = function(index, question) {
    question.answers.splice(index, 1);
  }

  $scope.setCorrectAnswer=function(question,answer){
    question.invalid = false;
    answer.correct = !answer.correct;
  };

  $scope.addQuestion = function(){
    $scope.addQuestionDisabled = true;
    $scope.quiz.questions.push({answers:[{correct:false},{correct:false}]});
  };
    
  $scope.deleteQuestion=function(index){
    $scope.quiz.questions.splice(index,1);
  };

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

  $scope.init();

}]);
