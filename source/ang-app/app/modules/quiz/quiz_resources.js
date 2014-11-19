'use strict';

/** Connection to back-end for quiz  */
angular.module('yunakQuiz.assessments')

.factory('QuizResource', ['$resource','CONFIG', function( $resource,CONFIG) {
  return $resource(CONFIG.BASE_URL+'/admin/assessments/:id/:title', 
      { id:'@id', title: '' },
      { 
        update: {method:'PUT'},
        validateTitle: {method:'POST', params: {id: undefined, title: 'title'}}
      }
      )
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
