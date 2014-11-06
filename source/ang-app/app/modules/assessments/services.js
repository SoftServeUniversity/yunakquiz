'use strict';

/** Connection to back-end for quiz  */
yunakQuizApp.factory('QuizData', ['$http', '$location', function($http, $location){
    return{
      get: function(id){
            return $http.get('http://localhost:9292/assessments/'+id )
          },

      update: function(quiz){
            return $http.put("http://localhost:9292/admin/assessments/"+quiz.id, quiz);
          },
          
      create: function(quiz){       
            return $http.post('http://localhost:9292/admin/assessments', quiz)
          },

      getList: function(state){
            return $http.get('http://localhost:9292/admin/assessments/'+state) 
          },

      getCat: function(){
            return $http.get('http://localhost:9292/categories') 
          },

      queryList: function(state, queryData){
            return $http.post('http://localhost:9292/admin/assessments/'+state, queryData) 
          },

      delete: function(id){
            return $http.delete('http://localhost:9292/admin/assessments/'+id ) 
          },

      getComments: function(id){
            return $http.get('http://localhost:9292/admin/assessments/comments/'+id)
          },

      updateComments: function(comments){
            return $http.put('http://localhost:9292/admin/assessments/comments', comments)
          },

      deleteComments: function(id){
            return $http.delete('http://localhost:9292/admin/assessments/comments/'+id)
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
