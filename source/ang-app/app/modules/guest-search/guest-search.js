(function (){
	var  app = angular.module('yunakQuiz.guestSearch' ,['ngRoute']);

		app.config(['$routeProvider',
      		function($routeProvider) {
        		$routeProvider.
            	when('/guest-search', {
              		templateUrl: './modules/guest-search/guest-search-page.html',
            	})
      	}
    ]);      
})();