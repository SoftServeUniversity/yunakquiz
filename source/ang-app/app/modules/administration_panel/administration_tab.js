(function (){
  var  app = angular.module('yunakQuiz.administrationTab' ,['ngRoute','yunakQuiz.permission']);

    app.config(['$routeProvider',
      function($routeProvider) {
        $routeProvider.
          when('/administration-panel/administrationTab', {
            templateUrl: './modules/administration_panel/administration_tab.html',
            controller: 'administrationTab'
          })
      }
    ]);

    app.controller('administrationTab', ['$scope', 'getAccess', '$location', function ($scope, getAccess, $location) {
      $scope.tab = 'Адміністрація';

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
