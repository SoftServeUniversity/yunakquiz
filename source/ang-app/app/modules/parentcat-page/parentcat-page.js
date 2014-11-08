(function (){
	var  app = angular.module('yunakQuiz.parentCatPage' ,['ngRoute','yunakQuiz.categoriesContainer']);

	app.config(['$routeProvider',
  	function($routeProvider) {
   		$routeProvider.
       	when('/parentcat-page/:par_id', {
       		templateUrl: './modules/parentcat-page/parentcat-page.html',
       		controller: 'parentCatPage'
       	})
   		}
 	]);
  
 	app.controller('parentCatPage', ['$scope', '$http','$routeParams','$filter', 'quizesById', 'categoriesQuery',  function ($scope, $http, $routeParams, $filter, quizesById, categoriesQuery) {
    $scope.parCategory = {};
    $scope.quizzes = {};
    $scope.subCategories = {};
    var current_id =  $routeParams.par_id;

    categoriesQuery.getCategoryById(current_id).success(function(data){
      $scope.parCategory = data;
    });
    categoriesQuery.getSubCatByParCatId(current_id).success(function(data){
      $scope.subCategories = data;
    });
    quizesById.get().success(function(data){
      $scope.quizzes = data;
      console.log = data;
    });          
        
    $scope.numberTest = function(subcat_id){
      var number = 0;
      var quizz = $scope.quizzes;
        for(var key in quizz){
          if(quizz[key].category_id === subcat_id) {
            number++;
          }
        };
        return number;
    };       
  }])
})();