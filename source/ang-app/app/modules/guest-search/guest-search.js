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
    scope: {
      allCats: '=',	
      tags: '=',
      filterFn: '&'
    },
    controller: 'gueastSearchController',
    templateUrl: './modules/guest-search/guest-search-cat-tmpl.html',
    replace: true
  }
}]);

guestSearch.directive('guestsearchtag', [ function() {
  return {
    restrict: 'EA',
    scope: {
      allCats: '=',	
      tags: '=',
      filterFn: '='
      
    },
    controller: 'gueastSearchController',
    templateUrl: './modules/guest-search/guest-search-tag-tmpl.html',
    replace: true
  }
}]);

guestSearch.controller('gueastSearchController', ['$scope', 'guestSearchFactory', function($scope, guestSearchFactory){

	$scope.search = function(){
		$scope.filterFn();
	};

	$scope.searchTags = function(){
		console.log("Tag search....", $scope.tags)
	};

	$scope.filterCats = function(){
		console.log("Cats filter....", $scope.allCats)
	};

// Select parCat and set subCat according to
  // parCat state
  $scope.selectSubCat = function(allCats, parCat) {

    parCat.search = !parCat.search;

    for (var i = 0 ; allCats.length > i ; i++){
      if (allCats[i].category_id == parCat.id) {
        allCats[i].search = parCat.search;
      };
    };
  };



}])