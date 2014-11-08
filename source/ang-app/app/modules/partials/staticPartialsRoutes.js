(function (){
  var  app = angular.module('yunakQuiz.staticPartialsRoute' ,['ngRoute','yunakQuiz.aboutusTab']);

    app.config(['$routeProvider',
      function($routeProvider) {
        $routeProvider.
          when('/contacts', {
            templateUrl: './modules/partials/contacts-page.html',
            controller:'contacts'
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
    }])
})(); 
    