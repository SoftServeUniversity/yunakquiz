(function (){
  //var  app = angular.module('yunakQuiz.staticPartialsRoute' ,['ngRoute','yunakQuiz.aboutusTab']);
var  app = angular.module('yunakQuiz.staticPartialsRoute' ,['ngRoute']);
    app.config(['$routeProvider',
      function($routeProvider) {
        $routeProvider.
          when('/about-us', {
            templateUrl: './modules/partials/about-us.html',
            controller: 'aboutUs'
          }).
          when('/contacts', {
            templateUrl: './modules/partials/contacts-page.html',
          })
      }
    ]);

    app.controller('aboutUs', 
      //['$scope', '$http', '$sce', 'aboutUsReadUpdate', function ($scope, $http, $sce, aboutUsReadUpdate) {
      ['$scope', '$http', '$sce', function ($scope, $http, $sce) {        
        $scope.about_Us = '';

        // aboutUsReadUpdate.read().success(function(data){
        //   $scope.about_Us = $sce.trustAsHtml(data[0].about_us);
        // });    
    }])
})(); 
