'use strict';
/** Quiz Edit controller  */
yunakQuizApp.controller('ReviewCtrl', ['$scope','QuizData', '$routeParams','tags', '$location','QuizValidation', function($scope, QuizData, $routeParams, tags, $location, QuizValidation) {

  /** get Quiz by ID */
  $scope.init = function(){
    QuizData.get($routeParams.quiz_id)
      .success(function(data, status, headers, config){
        $scope.quiz = data;
        $scope.getComments(data['id']);
        $scope.getCat();
        
        // $scope.setCat();
      })
      .error(function(data){
        $location.path('/404/');
      });
    }

  $scope.getCat = function(){
    QuizData.getCat().success(function(data, status, headers, config) {
          $scope.categories=data;      
          $scope.selectCat();  
      });
  };

  $scope.getComments = function(quiz_id) {
    QuizData.getComments(quiz_id)
      .success(function(data, status, headers, config){
        $scope.comments = data;
      });
  };

  $scope.selectCat = function(){
    for (var i=0; i < $scope.categories.length; i++){   
      if ($scope.selectSubcat($scope.categories[i].categories)){
        $scope.selectedCat = $scope.categories[i];
      }
    };
  }

  $scope.selectSubcat = function(subCatsArray){
    for (var i=0; i < subCatsArray.length; i++){    
      if (subCatsArray[i].id == $scope.quiz.category_id){
        $scope.selectedSubcat = subCatsArray[i];
        return true;
      };
    };
  };

  $scope.clearSubcat = function(){
    $scope.selectedSubcat='';
  };

  /** get all tags from backend*/
  $scope.loadTags = function(query) {
      return tags.load();
  };


  /** add empty answer*/
  $scope.addAnswer = function(question) {
    question.answers.push({correct:false});
  };

  /** mark answer to delete in backend */
  $scope.deleteAnswer = function(answer) {
    answer.toDelete = true;
  }

  /** set that this answer to be correct/incorrect */
  $scope.setCorrectAnswer=function(question,answer){
    question.invalid = false;
    answer.correct = !answer.correct;
  };

  /** add empty question */
  $scope.addQuestion = function(){
    $scope.addQuestionDisabled = true;
    $scope.quiz.questions.push({answers:[{correct:false},{correct:false}]});
  };
    
  /** delete question or mark to delete it on backend */  
  $scope.deleteQuestion = function(question,index){
    if(question.id){
      question.toDelete = true;
    }
    else{
      $scope.quiz.questions.splice(index,1);
    }
  };



  /** save draft Quiz */
  $scope.saveQuiz=function(){
    $scope.sendQuiz("draft");
  };

  /** save Quiz for review */
  $scope.reviewQuiz=function(){
    $scope.sendQuiz("review");
  };

  /** send Quiz to backend  */
  $scope.sendQuiz = function(state){
    $scope.quiz.category_id = $scope.selectedSubcat.id;
        $scope.quiz.status = state;
        
      if(!QuizValidation($scope.quiz.questions)){
        
        QuizData.update($scope.quiz)
          .success(function(data, status, headers, config) {
              $location.path('/admin/personalCabinet/'+state);
          })
                .error(function(data, status, headers, config) {
                  window.scrollTo(0,0);
            $scope.errorMsg = 'Ваш тест не збережено';
                });
      }
  };

  $scope.init();

}]);
