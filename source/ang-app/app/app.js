'use strict';

// Declare app level module which depends on views, and components
angular.module('yunakQuiz', [
  'ui.bootstrap',
  'ngRoute',
  'ngAnimate',
  'yunakQuiz.measures',
  'yunakQuiz.assessments',
  'yunakQuiz.users',
  'yunakQuiz.sessions',
  'yunakQuiz.version',
  'yunakQuiz.administrationPanel',
  'yunakQuiz.headerMenu',
  'yunakQuiz.guestSearch',
  'yunakQuiz.statistics',
  'yunakQuiz.staticPartialsRoute',
  'yunakQuiz.categoriesContainer',
  'yunakQuiz.subcategory'
]).config(['$routeProvider', '$httpProvider', '$locationProvider',
  function($routeProvider, $httpProvider, $locationProvider) {
    $httpProvider.defaults.withCredentials = true;
    $routeProvider.
      when('/', {
        templateUrl: 'modules/partials/home-page-greetings.html',
      }).
      otherwise({
        redirectTo: '/'
      });
    //$locationProvider.html5Mode(true);
}]);