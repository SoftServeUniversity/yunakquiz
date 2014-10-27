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
    }]);
})();