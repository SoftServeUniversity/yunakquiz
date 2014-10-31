'use strict';

// Declare app level module which depends on views, and components
angular.module('yunakQuiz', [
  'ngRoute',
  'yunakQuiz.measures',
  'yunakQuiz.assessments',
  'yunakQuiz.users',
  'yunakQuiz.sessions',
  'yunakQuiz.version',
  'yunakQuiz.headerMenu',
  'yunakQuiz.guestSearch',
  'yunakQuiz.statistics',
  'yunakQuiz.staticPartialsRoute',
  'yunakQuiz.categoriesContainer',
  'yunakQuiz.subcategory',
  'yunakQuiz.parentCatPage',
  'yunakQuiz.administrationPanel',
  'yunakQuiz.aboutusTab',
  'yunakQuiz.administrationTab',
  'yunakQuiz.blacklistTab',
  'yunakQuiz.faqTab',
  'yunakQuiz.quizzescategoriesTab',
  'yunakQuiz.userTab'
]).config(['$routeProvider',
      function($routeProvider) {
        $routeProvider.
            when('/', {
            templateUrl: 'modules/partials/home-page-greetings.html',
            }).
            otherwise({
            redirectTo: '/'
      });
  }])
.controller("ApplicationController", ["$http", "$scope", function($http, $scope){
  var app = this;
  this.username = "";
  $http.get("http://localhost:9292/access")
    .success(function(data){
      app.username = data;
    }).error(function(){
      app.username = undefined;
    });
  $scope.$on("user_logged_in", function(event, data){
    app.username = data;
  });
  this.userLoggedIn = function(){
    return (this.username != "") && (this.username != undefined);
    };
  this.logout = function(){
    $http.get("http://localhost:9292/logout")
      .success(function(data){
        app.username = undefined;
      });
  };
}]);

