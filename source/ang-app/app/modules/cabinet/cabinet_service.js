
angular.module('yunakQuiz.cabinet')
.factory('CabinetService', 
  ['$http', '$location','CONFIG',
   function($http, $location, CONFIG){

    return{
      queryList: function(state, queryData){
            return $http.post(CONFIG.BASE_URL+'/assessments/'+state, queryData) 
          },

      queryListModer: function(state, queryData){
            return $http.post(CONFIG.BASE_URL+'/assessments/moderator/'+state, queryData) 
          },

      checkPwd:function(request) {
            return $http.post(CONFIG.BASE_URL+'/checkpassword/', request)
      }     
    }
  }
])