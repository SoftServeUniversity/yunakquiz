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
        getAll: function(status){
          return $http.get('http://localhost:9292/admin/assessments/'+status )
        },
        quiz:{}
      }
    }
  ]);


