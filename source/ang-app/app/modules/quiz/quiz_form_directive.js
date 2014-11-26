angular.module('yunakQuiz.assessments')

.directive('unique', [ 'QuizResource', function(QuizResource) {
  return {
    restrict: 'A',
    require: 'ngModel',
    link: function (scope, element, attrs, ngModel) {
      /** Set validity on input uniqueness */
      function validate() {
        var quiz_id = scope.$parent.quiz.id;
        var property = attrs.name;
        var propertyValue = element.val().trim();
        
        if (!propertyValue) {
          ngModel.$setValidity('unique', true);
          scope.$apply();
          return
        }
        QuizResource.validate({id: quiz_id, property: property}, {query: propertyValue}, 
          function(data){ 
            ngModel.$setValidity('unique', !data.present);
            ngModel.$setValidity('transfer', true);
          },
          function(data){
            ngModel.$setValidity('transfer', false);
          }
        )
      };
      
      /** bind validate function on blur event  */  
      element.bind('blur', validate);
    }
  }
}])    
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
  ['$scope', 'QuizMngService', 'TagsService', 'CategoriesService', 'CONFIG',
  function($scope, QuizMngService, TagsService, CategoriesService, CONFIG){
  
  /** set default values */
  $scope.MIN_ASWERS_QTY=CONFIG.MIN_ASWERS_QTY;
  $scope.MIN_QUESTIONS_QTY=CONFIG.MIN_QUESTIONS_QTY;
  
  /** Get categories and set selected values if quiz is loaded */
  CategoriesService.getCat().success(function(data, status, headers, config) {
    $scope.categories=data;  
    $scope.$watch('quiz.id', function(newVal) {
     if (newVal) { selectCat() }
    });
  });

  /** Promise for autocomplete Tags  */
  $scope.loadTags = function (query) {
      return TagsService.getTags(query)
  };

  /** Clear subcategory on parent category change  */
  $scope.clearSubcat = function(){
    $scope.selectedSubcat='';
  };

  /** Set selected subcategory to Quiz  */
  $scope.setSubcat = function(){
    $scope.quiz.category_id = $scope.selectedSubcat.id;
  };

  /** Define and set selected category according to selected subcategory */
  function selectCat(){
    angular.forEach($scope.categories, function(category){
      if (selectSubcat(category.categories)) {
        $scope.selectedCat = category;
      }
    });
  }

  /** Define and set selected subcategory according to quiz.category */
  function selectSubcat(subCatsArray){
    for (var i=0; i < subCatsArray.length; i++){    
      if (subCatsArray[i].id == $scope.quiz.category_id){
        $scope.selectedSubcat = subCatsArray[i];
        return true;
      };
    };
  };

  /** Filer elements with toDelete mark */
  $scope.filterFunction = function(element) {
    return !element.toDelete
  };

  /** Add answer */
  $scope.addAnswer = function(question) {
    question.answers.push(new QuizMngService.Answer());
  };

  /** Delete or mark toDelete Answer */
  $scope.deleteAnswer = function(answer, question) {
    if (answer.id){
      answer.toDelete = true;
    }
    else {  
      var index = question.answers.indexOf(answer);
      question.answers.splice(index, 1);
    }  
  }

  /** Mark correct answer */
  $scope.setCorrectAnswer=function(question,answer){
    question.invalid = false;
    answer.correct = !answer.correct;
  };

  /** Add answer */
  $scope.addQuestion = function(){
    $scope.quiz.questions.push(new QuizMngService.Question())    
  };
    
  /** Delet or mark toDelete question */  
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
