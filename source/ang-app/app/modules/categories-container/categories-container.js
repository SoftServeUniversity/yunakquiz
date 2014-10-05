(function (){
	var  app = angular.module('yunakQuiz.categoriesContainer' ,['ngRoute']);

    	app.directive('categoriesContainer', function() {
      		return {
      			restrict: 'E',
      			templateUrl: './modules/categories-container/categories-container.html',
      			controller: ['$http','$scope', function($http,$scope){
                $scope.parCategories={};
                $scope.subCategories={};
      					$http.post('http://localhost:4567/parcat').success(function(data){
    						  $scope.parCategories = data;
                });
                $http.post('http://localhost:4567/subcat').success(function(data){
                  $scope.subCategories = data;
                });                
      			}],
				    controllerAs: 'parentCategoriesList'
          }
    	});   
})();

