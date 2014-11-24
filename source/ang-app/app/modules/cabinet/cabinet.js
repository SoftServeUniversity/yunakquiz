angular.module('yunakQuiz.cabinet', ['ngRoute', 'flow'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider
  .when('/admin/personalCabinet', {
    templateUrl: 'modules/cabinet/personal_cabinet.html',
    controller: 'CabinetCtrl',
    queryFn: "queryList",
    permision: "user"
  })
  .when('/admin/personalCabinet/profile', {
    templateUrl: 'modules/cabinet/profile.html',
    controller: 'ProfileController',
    controllerAs: 'profile',
    permision: "user"
  })
  .when('/admin/personalCabinet/:state', {
    templateUrl: 'modules/cabinet/personal_cabinet.html',
    controller: 'CabinetCtrl',
    queryFn: "queryList",
    permision: "user"
  })
  .when('/admin/moderationCabinet', {
    templateUrl: 'modules/cabinet/moderation_cabinet.html',
    controller: 'CabinetCtrl',
    queryFn: "queryListModer",
    permision: "moder"
  })
  .when('/admin/moderationCabinet/:state', {
    templateUrl: 'modules/cabinet/moderation_cabinet.html',
    controller: 'CabinetCtrl', 
    queryFn: "queryListModer",
    permision: "moder"
  })   
}]);