(function (){
	var  app = angular.module('yunakQuiz.userTab' ,['ngRoute']);

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

    app.controller('userTab', ['$scope', function ($scope) {
      $scope.tab = 'userTab';
      }]);

})();