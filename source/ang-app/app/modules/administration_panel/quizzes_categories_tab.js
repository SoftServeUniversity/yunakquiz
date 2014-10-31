(function (){
  var  app = angular.module('yunakQuiz.quizzescategoriesTab' ,['ngRoute','yunakQuiz.categoriesContainer']);

    app.config(['$routeProvider',
      function($routeProvider) {
        $routeProvider.
          when('/administration-panel/quizzescategoriesTab', {
            templateUrl: './modules/administration_panel/quizzes_categories_tab.html',
            controller: 'quizzescategoriesTab'
          })
      }
    ]);

    app.controller('quizzescategoriesTab', ['$http', '$scope','catsById', function ($http, $scope, catsById){
      $scope.tab = 'quizzescategoriesTab';
      $scope.categories = {};
      $scope.parCatName = function(category_id) {
        for(var key in $scope.categories){
          if($scope.categories[key].id === category_id) {
            return $scope.categories[key].title;
          };
        };
        return "---"
      };
      catsById.get('all').success(function(data){
        $scope.categories = data; 
      });
      $scope.addCategory = function(){
      alert("success");
      }
    }]);
})();
