(function (){
  var  app = angular.module('yunakQuiz.staticPartialsRoute' ,['ngRoute','yunakQuiz.aboutusTab']);

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
      ['$scope', '$http', '$sce', 'aboutUsReadUpdate', function ($scope, $http, $sce, aboutUsReadUpdate) {
        $scope.about_Us = '';

        aboutUsReadUpdate.read().success(function(data){
          $scope.about_Us = $sce.trustAsHtml(data[0].about_us);
        });    
    }])
})(); 
