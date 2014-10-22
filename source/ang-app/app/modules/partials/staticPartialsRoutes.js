(function (){
	var  app = angular.module('yunakQuiz.staticPartialsRoute' ,['ngRoute']);

		app.config(['$routeProvider',
      		function($routeProvider) {
        		$routeProvider.
            	when('/contacts', {
              	templateUrl: './modules/partials/contacts-page.html',
                controller:'contacts'
            	})
      		}
    ]);
    app.controller('contacts', 
      ['$scope', '$http', function ($scope, $http) {
        $scope.contacts = {};

        $http.get('http://localhost:9292/contacts').success(function(data){
          $scope.contacts = data;
        });    
    }])
})(); 