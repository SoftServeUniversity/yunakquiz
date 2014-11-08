(function (){
  var  app = angular.module('yunakQuiz.staticPartialsRoute' ,['ngRoute']);

    app.config(['$routeProvider',
      function($routeProvider) {
        $routeProvider.
          when('/about-us', {
            templateUrl: './modules/partials/about-us.html',
            controller: 'aboutUs'
          })
      }
    ]);

    app.controller('aboutUs', 
      ['$scope', '$http', '$sce', function ($scope, $http, $sce) {
        $scope.about_Us = '';

        $http.get('http://localhost:9292/about_us').success(function(data){
          $scope.about_Us = $sce.trustAsHtml(data[0].about_us);
        });    
    }])
})(); 

