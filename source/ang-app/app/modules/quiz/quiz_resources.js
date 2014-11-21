'use strict';

/** Connection to back-end for quiz  */
angular.module('yunakQuiz.assessments')

.factory('QuizResource', ['$resource','CONFIG', function( $resource,CONFIG) {
  return $resource(CONFIG.BASE_URL+'/admin/assessments/:id/:title', 
      { id:'@id', title:''},
      { 
        update: {method:'PUT'},
        validateTitle: {method:'POST', params: {id: undefined, title: 'title'}}
      }
  )
}])

.factory('CommentsResource', ['$resource','CONFIG', function( $resource,CONFIG) {
  return $resource(CONFIG.BASE_URL+'/assessments/:id/comments',  { id:'@quiz_id'} )
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
