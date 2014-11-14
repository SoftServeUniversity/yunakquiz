(function (){
  var  app = angular.module('yunakQuiz.staticPartialsRoute' ,['ngRoute','yunakQuiz.aboutusTab']);

    app.config(['$routeProvider',
      function($routeProvider) {
        $routeProvider.
          when('/about-us', {
            templateUrl: './modules/partials/about-us.html',
            controller: 'aboutUs'
          }).
          when('/contacts', {
            templateUrl: './modules/partials/contacts-page.html',
            controller: 'contacts'
          })
      }
    ]);

    app.factory("contactsRead", ['$http', function ($http) {
      return $http.get('http://localhost:9292/contacts')
    }]);

    app.controller('contacts', 
      ['$scope', '$http', 'contactsRead', function ($scope, $http, contactsRead) {
        $scope.contacts = {};

        contactsRead.success(function(data){
          $scope.contacts = data;
        });
    }]);
    app.controller('aboutUs', 
      ['$scope', '$http', '$sce', 'aboutUsReadUpdate', function ($scope, $http, $sce, aboutUsReadUpdate) {
        $scope.about_Us = '';

        aboutUsReadUpdate.read().success(function(data){
          $scope.about_Us = $sce.trustAsHtml(data[0].about_us);
        });    
    }])
})(); 
