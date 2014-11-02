'use strict';

var  guestSearch = angular.module('yunakQuiz.guestSearch', ['ngRoute',
  'yunakQuiz.subcategory', 'ngTagsInput']);

guestSearch.config(['$routeProvider',function($routeProvider) {
  $routeProvider.when('/guest-search', {
    templateUrl: './modules/guest-search/guest-search-page.html',
    controller: 'SearchCtrl'
  })
}]);    
