angular.module('yunakQuiz.assessments')
.directive('quizForm', [ function() {
  return {
    restrict: 'EA',
    scope: {quiz: '=', quizCreateForm: '='},
    controller: 'quizFormCtrl',
    templateUrl: './modules/assessments/QuizFormTpl.html',
    replace: true
  }
}])
.controller('quizFormCtrl', 
  ['$scope', 'QuizDataService', 'TagsService', 'CategoriesService', 
  function($scope, QuizDataService, TagsService, CategoriesService ){

  $scope.loadTags = function (query) {
      return TagsService.getTags(query)
  };

  function getCat(){
    CategoriesService.getCat().success(function(data, status, headers, config) {
          $scope.categories=data;        
      });
  };

  $scope.clearSubcat = function(){
    $scope.selectedSubcat='';
  };

  $scope.addAnswer = function(question) {
    question.answers.push(new QuizDataService.Answer());
  };

  $scope.deleteAnswer = function(index, question) {
    question.answers.splice(index, 1);
  }

  $scope.setCorrectAnswer=function(question,answer){
    question.invalid = false;
    answer.correct = !answer.correct;
  };

  $scope.addQuestion = function(){
    $scope.quiz.questions.push(new QuizDataService.Question())    
  };
    
  $scope.deleteQuestion=function(index){
    $scope.quiz.questions.splice(index,1);
  };

  getCat();
  
}]);
