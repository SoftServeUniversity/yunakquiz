(function (){
	var  app = angular.module('yunakQuiz.staticPartialsRoute' ,['ngRoute']);

		app.config(['$routeProvider',
      function($routeProvider) {
      	$routeProvider.
         	when('/about-us', {
           	templateUrl: './modules/partials/about-us.html',
         	}).
         	when('/contacts', {
           	templateUrl: './modules/partials/contacts-page.html',
         	})
      }
    ]);           
})();