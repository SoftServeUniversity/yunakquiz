(function (){
	var  app = angular.module('yunakQuiz.blacklistTab' ,['ngRoute']);

		app.config(['$routeProvider',
      function($routeProvider) {
      	$routeProvider.
          when('/administration-panel/blacklistTab', {
            templateUrl: './modules/administration_panel/black_list_tab.html',
            controller: 'blacklistTab'
          })
      }
    ]);

    app.controller('blacklistTab', ['$scope', function ($scope) {
      $scope.tab = 'blacklistTab';
    }]);
})();