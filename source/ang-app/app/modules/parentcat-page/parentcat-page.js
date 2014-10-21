(function (){
	var  app = angular.module('yunakQuiz.parentCatPage' ,['ngRoute']);

	app.config(['$routeProvider',
  	function($routeProvider) {
   		$routeProvider.
       	when('/parentcat-page/:par_id', {
       		templateUrl: './modules/parentcat-page/parentcat-page.html',
       		controller: 'parentCatPage'
       	})
   		}
 	]);

  
 	app.controller('parentCatPage', ['$scope', '$http','$routeParams', function ($scope, $http, $routeParams) {
    $scope.parCategory = {};
    $scope.quizzes = {};
    $scope.subCategories = {};
    var current_id =  $routeParams.par_id;

    $http.get('http://localhost:9292/categories/parentcat/' + current_id).success(function(data){
     	$scope.parCategory = data;
    });
    $http.get('http://localhost:9292/categories/subcategory/' + current_id).success(function(data){
      $scope.subCategories = data;
    });
    $http.get('http://localhost:9292/quizzes/ids').success(function(data){
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