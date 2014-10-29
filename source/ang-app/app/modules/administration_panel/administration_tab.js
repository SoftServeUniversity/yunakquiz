(function (){
  var  app = angular.module('yunakQuiz.administrationTab' ,['ngRoute']);

    app.config(['$routeProvider',
      function($routeProvider) {
        $routeProvider.
          when('/administration-panel/administrationTab', {
            templateUrl: './modules/administration_panel/administration_tab.html',
            controller: 'administrationTab'
          })
      }
    ]);

    app.controller('administrationTab', ['$scope', function ($scope) {
      $scope.tab = 'administrationTab';
    }]);
})();
