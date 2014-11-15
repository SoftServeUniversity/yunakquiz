(function (){
  var  app = angular.module('yunakQuiz.blacklistTab' ,['ngRoute', 'yunakQuiz.permission']);

    app.config(['$routeProvider',
      function($routeProvider) {
        $routeProvider.
        when('/administration-panel/blacklistTab', {
          templateUrl: './modules/administration_panel/black_list_tab.html',
          controller: 'blacklistTab'
        })
      }
    ]);

    app.controller('blacklistTab', ['$scope', 'getAccess', '$location', function ($scope, getAccess, $location) {
      $scope.tab = 'Чорний список';

      getAccess($scope.tab).then(function(data){
          if(data) {
            /*do thomething on access granted*/
          } else {
            $location.path( "/404" );
          }
        },function(){
          $location.path( "/404" ); 
          }
        );
    }]);
})();
