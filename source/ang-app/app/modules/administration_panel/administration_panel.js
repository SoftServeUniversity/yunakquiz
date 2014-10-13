(function (){
	var  app = angular.module('yunakQuiz.administrationPanel' ,['ngRoute']);

		app.config(['$routeProvider',
      function($routeProvider) {
      	$routeProvider.
          when('/administration-panel/:param1', {
            templateUrl: './modules/administration_panel/administration_panel.html',
            controller: 'adminPanel'
          })
      }
    ]);

    app.controller('adminPanel', ['$scope', '$http','$routeParams', function ($scope, $http, $routeParams) {
      
      $scope.tab = $routeParams.param1;
      $scope.isSelected = function (tab) {
        return $scope.tab ==  tab;
      };   
    }]);

    app.directive('userTab', function() {
      return {
        restrict: 'E',
        templateUrl: './modules/administration_panel/user_tab.html',
      }
    });   

    app.directive('administrationTab', function() {
      return {
        restrict: 'E',
        templateUrl: './modules/administration_panel/administration_tab.html',
      }
    });

    app.directive('blacklistTab', function() {
      return {
        restrict: 'E',
        templateUrl: './modules/administration_panel/black_list_tab.html',
      }
    });

    app.directive('quizzescategoriesTab', function() {
      return {
        restrict: 'E',
        templateUrl: './modules/administration_panel/quizzes_categories_tab.html',
      }
    });

    app.directive('databaseTab', function() {
      return {
        restrict: 'E',
        templateUrl: './modules/administration_panel/data_base_tab.html',
      }
    });
    app.directive('localizationsTab', function() {
      return {
        restrict: 'E',
        templateUrl: './modules/administration_panel/localizations_tab.html',
      }
    });
    app.directive('aboutusTab', function() {
      return {
        restrict: 'E',
        templateUrl: './modules/administration_panel/about_us_tab.html',
      }
    });
    app.directive('faqTab', function() {
      return {
        restrict: 'E',
        templateUrl: './modules/administration_panel/faq_tab.html',
      }
    });    
})();