'use strict';

/** Connection to back-end for quiz  */
yunakQuizApp.factory('QuizData', ['$http', '$location', function($http, $location){
  var back_url = 'http://localhost:9292';
    return{
      // get: function(id){
      //       return $http.get(back_url+'/assessments/'+id )
      //     },

      getForEdit: function(id){
            return $http.get(back_url+'/assessments/edit/'+id )
          },    

      create: function(quiz){       
            return $http.post(back_url+'/assessments', quiz)
          },

      update: function(quiz){
            return $http.put(back_url+'/assessments', quiz);
          },

      delete: function(id){
            return $http.delete(back_url+'/assessments/'+id ) 
          },

      queryList: function(state, queryData){
            return $http.post(back_url+'/assessments/'+state, queryData) 
          },

      queryListModer: function(state, queryData){
            return $http.post(back_url+'/assessments/moderator/'+state, queryData) 
          },

      getCat: function(){
            return $http.get(back_url+'/categories') 
          },

      // getBreadcrumbs: function(catId){
      //       return $http.get(back_url+'/breadcrumbs/'+catId) 
      //     },

      getComments: function(id){
            return $http.get(back_url+'/assessments/'+id+'/comments')
          },

      updateComments: function(comments){
            return $http.put(back_url+'/assessments/comments', comments)
          },

      deleteComments: function(id){
            return $http.delete(back_url+'/assessments/'+id+'/comments')
          },

      getTags: function(query){
            return $http.get(back_url+'/tags/'+query)
          },
    }
  }
])
.factory('QuizDataService', ['$http', '$location', function($http, $location){
  var MIN_ASWERS_QTY = 2;
  var back_url = 'http://localhost:9292';
  var quiz ={};
  
  function Question(){
    this.answers = [];
    for (var i=0; i < (MIN_ASWERS_QTY || 1); i++){
      this.answers.push(new Answer());
    };
  };

  function Answer(){
    this.correct = false;
  };

  function initQuiz(){
    this.quiz.questions = [];
    this.quiz.questions[0] = new Question();
  };

  return {
    quiz : quiz,
    Question : Question,
    Answer : Answer,
    initQuiz : initQuiz  
  }
}])
.factory('TagsService', ['$http', '$location', function($http, $location){
  var back_url = 'http://localhost:9292';
    return{
      getTags: function(query){
            return $http.get(back_url+'/tags/'+query)
      }
    }
  }
])
.factory('CategoriesService', ['$http', '$location', function($http, $location){
  var back_url = 'http://localhost:9292';
    return{
      getCat: function(){
            return $http.get(back_url+'/categories') 
      },
    }
  }
])
.factory('QuizValidation', [function(){

  /** check all questions to be valid */
  var validateQuiz = function(questions){
    var invalid = false;
    for(var i = 0; i < questions.length;i++){
      if(!questions[i].toDelete){
        validateQuestion(questions[i]);
        if(questions[i].invalid){
          invalid = true;
        };
      };
    };
    return invalid;
  };

  /** check question to be valid */
  function validateQuestion (question){
    var answers = question.answers;
    question.invalid = true;
    for(var i = 0; i < answers.length;i++){
      
      if (answers[i].correct && !answers[i].toDelete) {
        question.invalid =  false;
      };
    };
  };
  return validateQuiz;
  }
]);


yunakQuizApp.service('tags', function($q) {
  var tags = [
    {"tag": "Tag1" },
    {"tag": "Tag2" },
    {"tag": "Tag3" },
    {"tag": "Tag4" },
    {"tag": "Tag5" },
    {"tag": "Tag6" },
    {"tag": "Tag7" },
    {"tag": "Tag8" },
    {"tag": "Tag9" },
    {"tag": "Tag10" }
  ];
  
  this.load = function() {
    var deferred = $q.defer();
    deferred.resolve(tags);
    return deferred.promise;
  };
});
