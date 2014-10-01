(function (){
	var  app = angular.module('yunakQuiz.contacts' ,['ngRoute']);

		app.config(['$routeProvider',
      		function($routeProvider) {
       	 		$routeProvider.
            	when('/contacts', {
              	templateUrl: './modules/contacts/contacts-page.html',
            	})
      		}
    	]);      
})();