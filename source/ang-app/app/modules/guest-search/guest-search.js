'use strict';

var  guestSearch = angular.module('yunakQuiz.guestSearch', ['ngRoute', 'ui.bootstrap',
  'yunakQuiz.subcategory', 'ngTagsInput']);

guestSearch.config(['$routeProvider',function($routeProvider) {
  $routeProvider.when('/guest-search', {
    templateUrl: './modules/guest-search/guest-search-page.html',
    controller: 'SearchCtrl'
  })
}]);  

guestSearch.directive('guestsearchcat', [ function() {
  return {
    restrict: 'EA',
    scope:  { searchResults: '=', 
              allCats: '=',
              searchError: '=',
              tags: '=',
              currentPage: '=',
              totalItems: '='
            },
    controller: 'SearchCtrl',
    templateUrl: './modules/guest-search/guest-search-cat-tmpl.html',
    replace: true
  }
}]);

guestSearch.directive('guestsearchtag', [ function() {
  return {
    restrict: 'EA',
    scope: {  searchResults: '=', 
              allCats: '=',
              searchError: '=',
              tags: '=',
              currentPage: '=',
              totalItems: '='
            },
    controller: 'SearchCtrl',
    templateUrl: './modules/guest-search/guest-search-tag-tmpl.html',
    replace: true
  }
}]);  
