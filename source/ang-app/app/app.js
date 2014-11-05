'use strict';

// Declare app level module which depends on views, and components
angular.module('yunakQuiz', [
  'ngRoute',
  'ngResource',
  'ngTagsInput',
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
  'yunakQuiz.userTab',
  'yunakQuiz.personalCabinet'
])
.config(['$routeProvider', '$httpProvider',     
      function($routeProvider, $httpProvider) {
            $httpProvider.defaults.withCredentials = true;
        $routeProvider.
              when('/', {
                templateUrl: 'modules/partials/home-page-greetings.html',
              }).
              otherwise({
              redirectTo: '/'
      });
}]);
