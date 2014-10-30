(function (){
  var  app = angular.module('yunakQuiz.categoriesContainer' ,['ngRoute']);

      app.directive('categoriesContainer', function() {
        return {
         restrict: 'E',
          templateUrl: './modules/categories-container/categories-container.html',
            controller: ['$http','$scope', function($http,$scope){
          }],
            controllerAs: 'parentCategoriesList'
        }
      });   
})();
