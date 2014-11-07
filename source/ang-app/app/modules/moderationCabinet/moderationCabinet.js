angular.module('yunakQuiz.moderationCabinet', [])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider
  .when('/admin/moderationCabinet', {
    templateUrl: 'modules/moderationCabinet/moderationCabinet.html',
    controller: 'CabinetCtrl'
  })
  .when('/admin/moderationCabinet/review/:quiz_id', {
    templateUrl: 'modules/moderationCabinet/review.html',
    controller: 'ReviewCtrl'
  })  
  .when('/admin/moderationCabinet/:state', {
    templateUrl: 'modules/moderationCabinet/moderationCabinet.html',
    controller: 'CabinetCtrl'
  })
 
}]);
