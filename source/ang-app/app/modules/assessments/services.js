'use strict';

/** Connection to back-end for quiz  */
yunakQuizApp.factory('QuizData', ['$http', function($http){
    return{
      get: function(id, callback){
          $http({ method: 'GET', url: 'http://localhost:9292/assessments/'+id })
            .success(function(data, status, headers, config) {
				      callback(data); 
			       });
      },
      save: function(quiz){
          if (quiz.id) { 
            $http.put("http://localhost:9292/admin/assessments/"+quiz.id, quiz)
             .success(function(data, status, headers, config) {})
             .error( function(data, status, headers, config) {});
          }
          else { 
            $http.post('http://localhost:9292/admin/assessments', quiz)
              .success(function(data, status, headers, config) {})
              .error(function(data, status, headers, config) {});
          }
      }, 
      quiz:{}
    }
  }
]);


