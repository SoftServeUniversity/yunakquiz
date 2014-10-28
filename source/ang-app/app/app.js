'use strict';

// Declare app level module which depends on views, and components
angular.module('yunakQuiz', [
  'ngRoute',
  'ngTagsInput',
  'yunakQuiz.measures', 
  'yunakQuiz.assessments', 
  'yunakQuiz.users', 
  'yunakQuiz.sessions',
  // 'yunakQuiz.version', - no need for now, need to check in master branch
  'yunakQuiz.guestSearch',
  'yunakQuiz.categoriesContainer',
  'yunakQuiz.subcategory', 
  'yunakQuiz.parentCatPage' 
]).config(['$routeProvider',
  	  function($routeProvider) {
    		$routeProvider.
      		  when('/', {
        		templateUrl: 'modules/partials/home-page-greetings.html',
      		  }).
      		  otherwise({
        	  redirectTo: '/'
      });
  }]);










