(function(){ 
	var  app = angular.module('yunakQuiz.faqPage' ,['ngRoute']);

	app.config(['$routeProvider',
  	function($routeProvider) {
   		$routeProvider.
       	when('/faq', {
       		templateUrl: './modules/faq/faq.html',
       		controller: 'faqCtrl'
       	})
   		}
 	]);

 	app.controller('faqCtrl', ['$scope', '$http','$filter', function ($scope, $http, $filter) {

    $scope.Questions = [
      {"quest": "How to turn on the computer?", "ans": "Push the big button on your system block"},
      {"quest": "Where I can find a test of football?", "ans": "On the main page in category Sport"},
      {"quest": "How much are answers evalueted?", "ans": "In 100%"}
    ];

    $scope.ClickFunc = function(){

    };
          
  	}])

})();