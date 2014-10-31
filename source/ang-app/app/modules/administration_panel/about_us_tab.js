(function (){
  var  app = angular.module('yunakQuiz.aboutusTab' ,['ngRoute','textAngular']);

    app.config(['$routeProvider',
      function($routeProvider) {
        $routeProvider.
          when('/administration-panel/aboutusTab', {
            templateUrl: './modules/administration_panel/about_us_tab.html',
            controller: 'aboutusTab'
          })
      }
    ]);

    app.controller('aboutusTab', ['$scope', '$http',
      function ($scope, $http) {
        $scope.tab = 'aboutusTab';
        $scope.content = '';
      
        $http.get('http://localhost:9292/about_us').success(function(data){
          $scope.content = data[0].about_us;
        });    
      }
    ]);
})();
