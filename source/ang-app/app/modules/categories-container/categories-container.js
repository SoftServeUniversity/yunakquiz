(function (){
   var  app = angular.module('yunakQuiz.categoriesContainer' ,['ngRoute']);
   app.factory("catsById", ['$http', function ($http) {
     return { //if id = 'parcat' then return all par cat ,id ='subcat' then return all subcats,id='all' then return all categories
        get : function(id, callback) {
          $http.get('http://localhost:9292/categories/' + id).success(function(data){
            callback(data);
          });
        }
     };
   }]);
   app.factory("quizesById", ['$http', function ($http) {
     return { //return quizz by id or return all if 0 provided as id
       get : function(id, callback) {
         $http.get('http://localhost:9292/quizzes/' + id).success(function(data){
           callback(data);
         });
       }
     };
   }]);

   app.directive('categoriesContainer', function() {
   return {
    restrict: 'E',
    templateUrl: './modules/categories-container/categories-container.html',
    controller: ['$http','$scope', 'catsById', 'quizesById', function($http, $scope, catsById, quizesById){
      $scope.parCategories = {};
      $scope.quizzes = {};
      $scope.subCategories = {};
      catsById.get('parcat', function(data){
        $scope.parCategories = data; 
      });
      catsById.get('subcat', function(data){
        $scope.subCategories = data; 
      });      
      quizesById.get(0, function(data){
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
      };
    });   
})();