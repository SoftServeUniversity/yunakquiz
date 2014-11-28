
angular.module('yunakQuiz.userStatistic')
// .factory('UserStatiticService', ['$http', '$location','CONFIG', function($http, $location, CONFIG){

//     return{
//       getStat: function(){
//             return $http.get(CONFIG.BASE_URL+'/statistic') 
//           }, 
//       getList: function(request){
//             return $http.post(CONFIG.BASE_URL+'/statistic',request) 
//           }  
//     }
//   }
// ])

.factory('UserStatisticService', ['$resource','CONFIG', function( $resource,CONFIG) {
  return $resource(CONFIG.BASE_URL+'/statistic/:page/:perPage',{ page:'', perPage:''})
}])