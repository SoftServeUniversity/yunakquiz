(function (){
	var  app = angular.module('yunakQuiz.faqTab' ,['ngRoute']);

		app.config(['$routeProvider',
      function($routeProvider) {
      	$routeProvider.
          when('/administration-panel/faqTab', {
            templateUrl: './modules/administration_panel/faq_tab.html',
            controller: 'faqTab'
          })
      }
    ]);

    app.controller('faqTab', ['$scope', function ($scope) {
      $scope.tab = 'faqTab';
    }]);
})();