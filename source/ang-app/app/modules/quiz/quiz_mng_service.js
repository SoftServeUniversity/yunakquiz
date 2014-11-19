'use strict';

/** Connection to back-end for quiz  */
angular.module('yunakQuiz.assessments')
.factory('QuizResourceService', 
  ['$http', '$location', '$resource' , 
  function($http, $location, $resource){

   var back_url = 'http://localhost:9292/admin/assessments';
    return{
      get: function(id){
            return $http.get(back_url+'/'+id )
          },    

      create: function(quiz){       
            return $http.post(back_url, quiz)
          },

      update: function(quiz){
            return $http.put(back_url+'/'+quiz.id, quiz);
          },

      delete: function(id){
            return $http.delete(back_url+'/'+id ) 
          },
      validateTitle: function(title, id){
            var data = {query: title, id: id};
            return $http.post(back_url+'/title', data) 
          }    

    }      
}])
.factory('QuizResource', ['$resource','CONFIG', function( $resource,CONFIG) {
   
    return $resource(CONFIG.BASE_URL+'/admin/assessments/:id', 
      { id:'@id' },
      { update: {method:'PUT'} }
      )
  }])
.factory('QuizMngService', 
  ['$http', '$location', 'QuizCommentsService', '$filter', 'CONFIG',
  function($http, $location, QuizCommentsService, $filter, CONFIG){

  var quiz ={};
  
  function Question(){
    this.answers = [];
    for (var i=0; i < (CONFIG.MIN_ASWERS_QTY); i++){
      this.answers.push(new Answer());
    };
  };

  function Answer(){
    this.correct = false;
  };

  function initQuiz(){
    this.quiz = {};
    this.quiz.questions = [];
    for (var i=0; i < (CONFIG.MIN_QUESTIONS_QTY); i++){
      this.quiz.questions.push(new Question());
    };
  };

  function filterDeleted(element) {
    return element.toDelete ? false : true
  };

  function validateQuiz(quiz){
    var invalid = false;
    var questions = $filter('filter')(quiz.questions, filterDeleted);
    angular.forEach(questions, function(question){
      validateQuestion(question);
      if(question.invalid){
          invalid = true;
      };
    });
    return invalid;
  };

  /** check question to have at least one correct answer */
  function validateQuestion (question){
    var answers = $filter('filter')(question.answers, filterDeleted);
    answers = $filter('filter')(answers, {correct: true})
    question.invalid =  answers.length ? false : true;
  };
  
  return {
    quiz : quiz,
    Question : Question,
    Answer : Answer,
    initQuiz : initQuiz,
    validateQuiz : validateQuiz 
  }

}])

.factory('QuizCommentsService', 
  ['$http', '$location', '$resource' , 
  function($http, $location, $resource){
   
   var back_url = 'http://localhost:9292';
    return{
       get: function(id){
            return $http.get(back_url+'/assessments/'+id+'/comments')
          },

      update: function(comments){
            return $http.put(back_url+'/assessments/comments', comments)
          },

      delete: function(id){
            return $http.delete(back_url+'/assessments/'+id+'/comments')
          }
      }    
}])

.factory('TagsService', ['$http', 'CONFIG', function($http, CONFIG){
    return{
      getTags: function(query){
            return $http.get(CONFIG.BASE_URL+'/tags/'+query)
      }
    }
}])

.factory('CategoriesService', ['$http', 'CONFIG', function($http, CONFIG){
    return{
      getCat: function(){
            return $http.get(CONFIG.BASE_URL+'/categories') 
      },
    }
}])


