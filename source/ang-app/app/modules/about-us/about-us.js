(function (){
	var  app = angular.module('yunakQuiz.aboutUs' ,['ngRoute']);

		app.config(['$routeProvider',
      		function($routeProvider) {
        		$routeProvider.
            	when('/about-us', {
              	templateUrl: './modules/about-us/about-us.html',
            	})
      		}
    	]);      
})();