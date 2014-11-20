'use strict';

// Declare app level module which depends on views, and components
angular.module('yunakQuiz', [
  'ui.bootstrap',
  'ngAnimate',
  'ngRoute',
  'ngResource',
  'yunakQuiz.measures',
  'yunakQuiz.assessments',
  'yunakQuiz.personalCabinet',
  'yunakQuiz.moderationCabinet',
  'yunakQuiz.users',
  'yunakQuiz.sessions',
  'yunakQuiz.version',
  'yunakQuiz.administrationPanel',
  'yunakQuiz.headerMenu',
  'yunakQuiz.guestSearch',
  'yunakQuiz.statistics',
  'yunakQuiz.staticPartialsRoute',
  'yunakQuiz.categoriesContainer',
  'yunakQuiz.subcategory',
  'ngTagsInput',
  'yunakQuiz.parentCatPage',
  'yunakQuiz.faqPage',
  'yunakQuiz.permission'
])
.config(['$routeProvider', '$httpProvider',     
  function($routeProvider, $httpProvider) {
    $httpProvider.defaults.withCredentials = true;
    $routeProvider.
      when('/', {
        templateUrl: 'modules/partials/home-page-greetings.html',
      }).
      when('/404', {
        templateUrl: 'modules/404/404.html',
      }).
      otherwise({
        redirectTo: '/'
      });
}])
.constant('paginationConfig', {
  boundaryLinks: true,
  directionLinks: true,
  maxSize : 10,
  rotate: false,
  firstText: '≪',
  previousText: '<',
  nextText: '>',
  lastText: '≫'
});
