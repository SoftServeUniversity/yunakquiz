(function (){
	var  app = angular.module('yunakQuiz.categoriesContainer' ,['ngRoute']);

    	app.directive('categoriesContainer', function() {
      		return {
      			restrict: 'E',
      			templateUrl: './modules/categories-container/categories-container.html',
      			controller: ['$http','$scope', function($http,$scope){
                $scope.parCategories = {};
                $scope.assessments = {};
                $scope.subCategories = {};
      					$http.get('http://localhost:9292/parcat').success(function(data){
                  $scope.parCategories = data;
                });
                $http.get('http://localhost:9292/subcat').success(function(data){
                  $scope.subCategories = data;
                });
                $http.get('http://localhost:9292/assessments/ids').success(function(data){
                  $scope.assessments = data;
                });                
                $scope.testsCount = function(parcat_id){
                  var testsCount = 0;
                  var subCat =$scope.subCategories;
                  var assesmnt = $scope.assessments;
                  for(var key in subCat){
                    if(subCat[key].parcat_id === parcat_id) {
                      for(var key2 in assesmnt) {
                        if(assesmnt[key2].subcat_id === subCat[key].id) {
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

