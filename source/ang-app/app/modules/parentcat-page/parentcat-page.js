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
  app.factory("getSubCatByCatId", ['$http', function ($http) {
    return { 
      get : function(id, callback) {
        $http.get('http://localhost:9292/categories/subcat/'  + id).success(function(data){
        callback(data);
        });
      }
    }
  }]);

  app.filter('charLimit', function(){
    return function(quizT){
      if(quizT.length <= 13){
        return quizT
      } else{
        return quizT.substring(0, 13) + '...'
      }
    }
  });
  
 	app.controller('parentCatPage', ['$scope', '$http','$routeParams','$filter', 'quizesById', 'catsById', 'getSubCatByCatId', function ($scope, $http, $routeParams, $filter, quizesById, catsById, getSubCatByCatId) {
    $scope.parCategory = {};
    $scope.quizzes = {};
    $scope.subCategories = {};

    var current_id =  $routeParams.par_id;

    catsById.get(current_id ,function(data){
          $scope.parCategory = data;
        });
    getSubCatByCatId.get(current_id ,function(data){
          $scope.subCategories = data;
        });
      quizesById.get(0, function(data){
            $scope.quizzes = data;
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