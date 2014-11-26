
angular.module('yunakQuiz.userStatistic')

.factory('UserStatisticService', ['$resource','CONFIG', function( $resource,CONFIG) {
  return $resource(CONFIG.BASE_URL+'/statistic/:page/:perPage',{ page:'', perPage:''})
}])