'use strict';

// Declare app level module which depends on views, and components
angular.module('yunakQuiz', [
  'ngRoute',
  'yunakQuiz.measures',
  'yunakQuiz.assessments',
  'yunakQuiz.personalCabinet',
  'yunakQuiz.users',
  'yunakQuiz.sessions',
  'yunakQuiz.version',
  'ngTagsInput'
 ]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/measures'});
}]);



