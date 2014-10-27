(function (){
	var  app = angular.module('yunakQuiz.aboutusTab' ,['ngRoute']);

		app.config(['$routeProvider',
      function($routeProvider) {
      	$routeProvider.
          when('/administration-panel/aboutusTab', {
            templateUrl: './modules/administration_panel/about_us_tab.html',
            controller: 'aboutusTab'
          })
      }
    ]);

    app.controller('aboutusTab', ['$scope', function ($scope) {
      $scope.tab = 'aboutusTab';
      }]);
})();