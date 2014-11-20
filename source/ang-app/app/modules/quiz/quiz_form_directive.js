angular.module('yunakQuiz.assessments')
.directive('quizForm', [ function() {
  return {
    restrict: 'EA',
    scope: {quiz: '=', quizFormName: '='},
    controller: 'quizFormCtrl',
    templateUrl: './modules/quiz/quiz_form.html',
    replace: true
  }
}])
.controller('quizFormCtrl', 
  ['$scope', 'QuizMngService', 'TagsService', 'CategoriesService', 'QuizResource', 'CONFIG',
  function($scope, QuizMngService, TagsService, CategoriesService, QuizResource, CONFIG){
  
  $scope.MIN_ASWERS_QTY=CONFIG.MIN_ASWERS_QTY;
  $scope.MIN_QUESTIONS_QTY=CONFIG.MIN_QUESTIONS_QTY;
  
  CategoriesService.getCat().success(function(data, status, headers, config) {
    $scope.categories=data;  
    $scope.$watch('quiz.id', function(newVal) {
     if (newVal) { selectCat() }
    });
  });

  $scope.loadTags = function (query) {
      return TagsService.getTags(query)
  };

  $scope.clearSubcat = function(){
    $scope.selectedSubcat='';
  };

  $scope.setSubcat = function(){
    $scope.quiz.category_id = $scope.selectedSubcat.id;
  };

  function selectCat(){
    angular.forEach($scope.categories, function(category){
      if (selectSubcat(category.categories)) {
        $scope.selectedCat = category;
      }
    });
  }

  function selectSubcat(subCatsArray){
    for (var i=0; i < subCatsArray.length; i++){    
      if (subCatsArray[i].id == $scope.quiz.category_id){
        $scope.selectedSubcat = subCatsArray[i];
        return true;
      };
    };
  };

  $scope.validateTitle = function(){
    QuizResource.validateTitle({id:$scope.quiz.id, query:$scope.quiz.title}, successTitle);
  };

  function successTitle(data){
    $scope.titleError =  data.titlePresent;
  };
  
  $scope.filterFunction = function(element) {
    return !element.toDelete
  };

  $scope.addAnswer = function(question) {
    question.answers.push(new QuizMngService.Answer());
  };

  $scope.deleteAnswer = function(answer, question) {
    if (answer.id){
      answer.toDelete = true;
    }
    else {  
      var index = question.answers.indexOf(answer);
      question.answers.splice(index, 1);
    }  
  }

  $scope.setCorrectAnswer=function(question,answer){
    question.invalid = false;
    answer.correct = !answer.correct;
  };

  $scope.addQuestion = function(){
    $scope.quiz.questions.push(new QuizMngService.Question())    
  };
    
  $scope.deleteQuestion = function(question){
    if(question.id){
      question.toDelete = true;
    }
    else{
      var index = $scope.quiz.questions.indexOf(question);
      $scope.quiz.questions.splice(index, 1);
    }
  };

  
  
}]);
