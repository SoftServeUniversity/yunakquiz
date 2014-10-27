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
             
          
  	}])

})();