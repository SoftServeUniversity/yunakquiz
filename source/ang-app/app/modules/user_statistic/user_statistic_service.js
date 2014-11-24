
angular.module('yunakQuiz.userStatistic')
.factory('UserStatiticService', ['$http', '$location','CONFIG', function($http, $location, CONFIG){

    return{
      getStat: function(request){
            return $http.get(CONFIG.BASE_URL+'/statistic/'+request) 
          }    
    }
  }
])