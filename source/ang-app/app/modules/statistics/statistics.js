(function (){
	var  app = angular.module('yunakQuiz.statistics' ,['ngRoute']);

		app.config(['$routeProvider',
			function($routeProvider) {
        		$routeProvider.
            	when('/statistics', {
              		templateUrl: './modules/statistics/statistics.html',
            	})
      		}
    	]);      
})();