(function (){
	var  app = angular.module('yunakQuiz.categoriesContainer' ,['ngRoute']);

    	app.directive('categoriesContainer', function() {
      		return {
      			restrict: 'E',
      			templateUrl: './modules/categories-container/categories-container.html',
      			controller: ['$http','$scope', function($http,$scope){
                $scope.parCategories = {};
                $scope.quizzes = {};
                $scope.subCategories = {};
      					$http.get('http://localhost:9292/categories/parent').success(function(data){
                  $scope.parCategories = data;
                });
                $http.get('http://localhost:9292/categories/subcat').success(function(data){
                  $scope.subCategories = data;
                });
                $http.get('http://localhost:9292/quizzes/ids').success(function(data){
                  $scope.quizzes = data;
                });                
                $scope.testsCount = function(parcat_id){
                  var testsCount = 0;
                  var subCat = $scope.subCategories;
                  var quiz = $scope.quizzes;
                  for(var key in subCat){
                    if(subCat[key].category_id === parcat_id) {
                      for(var key2 in quiz) {
                        if(quiz[key2].category_id === subCat[key].id) {
                          testsCount++;
                        }
                      }
                    };
                  };
                  return testsCount;
                };
      			}],
				    controllerAs: 'parentCategoriesList'
          }
    	});   
})();

