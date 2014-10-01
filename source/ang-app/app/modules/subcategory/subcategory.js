(function (){
	var  app = angular.module('yunakQuiz.subcategoryContainer' ,['ngRoute']);

app.config(['$routeProvider',
          function($routeProvider) {
            $routeProvider.
              when('/subcategory', {
                templateUrl: './modules/subcategory/subcategory.html',
            })
        }
    ]);


app.directive('subcategoryContainer', function() {
          return {
            restrict: 'E',
            templateUrl: './modules/subcategory/subcategory2.html',
            controller:['$http','$scope',function($http,$scope){
              
                    $http.get('../components/DataBase/tests.json')
                      .success(function(data){
                        $scope.testBase=data;
                        });
                    $scope.sorting ="name";
                  }],
            controllerAs: 'subcategoryController'
      }
      });  

	})();	
		    	



 


