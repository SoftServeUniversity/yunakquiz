'use strict';

// Declare app level module which depends on views, and components
angular.module('yunakQuiz', [
  'ui.bootstrap',
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
  'yunakQuiz.subcategory'
])
.config(['$routeProvider', 
  function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'modules/partials/home-page-greetings.html',
      })
      .otherwise({
        redirectTo: '/'
      });
}]);
