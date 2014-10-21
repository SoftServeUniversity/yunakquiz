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
                controller:'contacts'
            	})
      		}
    ]);
    app.controller('contacts', 
      ['$scope', '$http','$routeParams', 'catsById', function ($scope, $http, $routeParams, catsById) {
      var parcat_id = $routeParams.id;
        $scope.contacts = {};

        $http.get('http://localhost:9292/contacts').success(function(data){
          $scope.contacts = data;
        });    
  }])               
})();