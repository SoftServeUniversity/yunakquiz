'use strict';

/** Connection to back-end for quiz  */
yunakQuizApp.factory('QuizData', ['$http', '$location', function($http, $location){
    return{
      get: function(id, callback){
          $http({ method: 'GET', url: 'http://localhost:9292/assessments/'+id })
            .success(function(data, status, headers, config) {
				      callback(data); 
			       });
      },
      save: function(quiz){
          if (quiz.id) { 
            return $http.put("http://localhost:9292/admin/assessments/"+quiz.id, quiz);
          }
          else { 
            $http.post('http://localhost:9292/admin/assessments', quiz)
              .success(function(data, status, headers, config) {
                $location.path('/admin/assessments/'+data)
              })
              .error(function(data, status, headers, config) {});
          }
      }, 
      quiz:{}
    }
  }
]);


