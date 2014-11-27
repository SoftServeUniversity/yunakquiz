angular.module('yunakQuiz.userStatistic', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider
  .when('/admin/statistic', {
    templateUrl: 'modules/user_statistic/user_statistic_general.html',
    controller: 'UserStatisticGeneralCtrl',
    permission: 'user'
  })
  .when('/admin/statistic/general', {
    templateUrl: 'modules/user_statistic/user_statistic_general.html',
    controller: 'UserStatisticGeneralCtrl',
    permission: 'user'
  })
  .when('/admin/statistic/list', {
    templateUrl: 'modules/user_statistic/user_statistic_list.html',
    controller: 'UserStatisticListCtrl',
    permission: 'user'
  })

}]);