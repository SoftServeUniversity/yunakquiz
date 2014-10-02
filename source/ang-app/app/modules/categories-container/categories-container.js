(function (){
	var  app = angular.module('yunakQuiz.categoriesContainer' ,['ngRoute']);

    	app.directive('categoriesContainer', function() {
      		return {
      			restrict: 'E',
      			templateUrl: './modules/categories-container/categories-container.html',
      			controller: ['$http','$scope', function($http,$scope){
      					$http.get('../components/DataBase/parent-categories.json').success(function(data){
    						  $scope.parCategories = data;
                });
      			}],
				    controllerAs: 'parentCategoriesList'
          }
    	});   
})();

