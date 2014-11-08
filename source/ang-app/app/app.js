'use strict';

// Declare app level module which depends on views, and components
angular.module('yunakQuiz', [
  'ui.bootstrap',
  'ngRoute',
  'yunakQuiz.measures',
  'yunakQuiz.assessments',
  'yunakQuiz.personalCabinet',
  'yunakQuiz.moderationCabinet',
  'yunakQuiz.users',
  'yunakQuiz.sessions',
  'yunakQuiz.version',
  'yunakQuiz.administrationPanel',
  'yunakQuiz.aboutusTab',
  'yunakQuiz.administrationTab',
  'yunakQuiz.blacklistTab',
  'yunakQuiz.faqTab',
  'yunakQuiz.quizzescategoriesTab',
  'yunakQuiz.userTab',
  'yunakQuiz.headerMenu',
  'yunakQuiz.guestSearch',
  'yunakQuiz.statistics',
  'yunakQuiz.staticPartialsRoute',
  'yunakQuiz.categoriesContainer',
  'yunakQuiz.subcategory',
  'ngTagsInput',
  'yunakQuiz.aboutusTab',
])
.config(['$routeProvider',
 	function($routeProvider) {
 		$routeProvider
      .when('/', {
     		templateUrl: 'modules/partials/home-page-greetings.html',
     	})
      .otherwise({
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



