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
  'yunakQuiz.contacts',
  'yunakQuiz.statistics',
  'yunakQuiz.aboutUs',
  'yunakQuiz.categoriesContainer',
  'yunakQuiz.subcategoryContainer'
]).config(['$routeProvider',
  	  function($routeProvider) {
    		$routeProvider.
      		  when('/', {
        		templateUrl: 'modules/layouts/home-page-greetings.html',
      		  }).
      		  otherwise({
        	  redirectTo: '/'
      });
  }]);/*.
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/measures'});
}]);*/
