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

  $scope.setSubcat = function(){
    $scope.quiz.category_id = $scope.selectedSubcat.id;
  };

  $scope.selectCat = function(){
    for (var i=0; i < $scope.categories.length; i++){   
      if (selectSubcat($scope.categories[i].categories)){
        $scope.selectedCat = $scope.categories[i];
      }
    };
  }

  function selectSubcat(subCatsArray){
    for (var i=0; i < subCatsArray.length; i++){    
      if (subCatsArray[i].id == $scope.quiz.category_id){
        $scope.selectedSubcat = subCatsArray[i];
        return true;
      };
    };
  };

  $scope.addAnswer = function(question) {
    question.answers.push(new QuizDataService.Answer());
  };

  $scope.deleteAnswer = function(index, question) {
    if (question.answers[index].id){
      question.answers[index].toDelete = true;
    }
    else {  
      question.answers.splice(index, 1);
    }  
  }

  $scope.setCorrectAnswer=function(question,answer){
    question.invalid = false;
    answer.correct = !answer.correct;
  };

  $scope.addQuestion = function(){
    $scope.quiz.questions.push(new QuizDataService.Question())    
  };
    
  $scope.deleteQuestion = function(index, question){
    if(question.id){
      question.toDelete = true;
    }
    else{
      $scope.quiz.questions.splice(index,1);
    }
  };

  getCat();
  
}]);
