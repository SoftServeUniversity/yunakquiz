(function (){
  var  app = angular.module('yunakQuiz.userTab' ,['ngRoute','yunakQuiz.permission']);

    app.config(['$routeProvider',
      function($routeProvider) {
        $routeProvider.
          when('/administration-panel/', {
            templateUrl: './modules/administration_panel/user_tab.html',
            controller: 'userTab'
          }).
          when('/administration-panel/userTab', {
            redirectTo: '/administration-panel/'
          })
      }
    ]);

    app.controller('userTab', ['$scope', 'getAccess', '$location', function ($scope, getAccess, $location) {
      $scope.tab = 'Користувачі';

      getAccess($scope.tab).then(function(data){
          if(data) {
            /*do thomething on access granted*/
          } else {
          $location.path( "/404" );
          };
      });
    }]);
})();
