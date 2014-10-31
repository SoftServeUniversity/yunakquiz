(function (){
  var  app = angular.module('yunakQuiz.categoriesContainer' ,['ngRoute']);

    app.factory("catsById", ['$http', function ($http) {
      return { //if id = 'parcat' then return all par cat ,id ='subcat' then return all subcats,id='all' then return all categories
        get : function(id) {
          return $http.get('http://localhost:9292/categories/' + id)
        }
      }
    }]);

    app.factory("quizesById", ['$http', function ($http) {
      return { //return quizz by id or return all if 0 provided as id
        get : function(id) {
          return $http.get('http://localhost:9292/quizzes/' + id)
        }
      }
    }]);

    app.directive('categoriesContainer', function() {
      return {
        restrict: 'E',
        templateUrl: './modules/categories-container/categories-container.html',
        controller: ['$http','$scope', 'catsById', 'quizesById', function($http, $scope, catsById, quizesById){
          $scope.parCategories = {};
          $scope.quizzes = {};
          $scope.subCategories = {};
          $scope.quizzesCount = {};

          function groupById(target){
            var groupedObjectById = {};

            angular.forEach(target, function(cat, key){
              if(!groupedObjectById[cat.category_id]){
                groupedObjectById[cat.category_id] = [];
              };
              groupedObjectById[cat.category_id].push(cat);
            });
            return groupedObjectById;
          };

          function quizCount(groupedSubcat, groupedQuizzes, parcat_id, target){
            var testsCount = 0;

            angular.forEach(groupedSubcat[parcat_id], function(cat, key){
              if(groupedQuizzes[cat.id]){
                testsCount = testsCount + groupedQuizzes[cat.id].length;
              };
            });
            target[parcat_id] = testsCount;
            return testsCount;
          };

          catsById.get('parcat').success(function(data){
            $scope.parCategories = data; 
          });

          catsById.get('subcat').success(function(data){
            $scope.subCategories = groupById(data);
          });

          quizesById.get(0).success(function(data){
            $scope.quizzes = groupById(data);

            angular.forEach($scope.subCategories, function(cat,key){
              quizCount($scope.subCategories, $scope.quizzes, key, $scope.quizzesCount);
            })
          });
        }],
        controllerAs: 'parentCategoriesList'
      }
    });
})();
