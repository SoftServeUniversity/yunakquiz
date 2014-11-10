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
    scope: {allCats: '=',	filterFn: '&' },
    controller: 'guestSearchCatsController',
    templateUrl: './modules/guest-search/guest-search-cat-tmpl.html',
    replace: true
  }
}]);

guestSearch.directive('guestsearchtag', [ function() {
  return {
    restrict: 'EA',
    scope: {tags: '=', filterFn: '&' },
    controller: 'guestSearchTagsController',
    templateUrl: './modules/guest-search/guest-search-tag-tmpl.html',
    replace: true
  }
}]);

guestSearch.controller('guestSearchCatsController', ['$scope', 'guestSearchFactory', function($scope, guestSearchFactory){

  guestSearchFactory.getAllCats().success(function(data) {
    $scope.allCats = data;
  }).error(function(data) {
      $scope.searchError = 2;
    });

  $scope.selectSubCat = function(allCats, parCat) {
    parCat.search = !parCat.search;
    for (var i = 0 ; allCats.length > i ; i++){
      if (allCats[i].category_id == parCat.id) {
        allCats[i].search = parCat.search;
      };
    };
  };

  $scope.search = function(){
   $scope.filterFn();
  };

}]);

guestSearch.controller('guestSearchTagsController', ['$scope', 'guestSearchFactory', function($scope, guestSearchFactory){
    
  $scope.loadTags = function(query) {
    return guestSearchFactory.getTags(query)
  }; 

  $scope.search = function(){
      $scope.filterFn();
  };

}]);

guestSearch.factory('guestSearchService', [ function() {
   var searchRequest = {categories_id:[], tags:[]};

   var formCats = function(allCats){ 
    searchRequest.categories_id = [];
    for (var i = 0 ; allCats.length > i ; i++) {
      if (allCats[i].search){
        searchRequest.categories_id.push(allCats[i].id);
      };
    };
    if (searchRequest.categories_id.length === 0) {
      addAllCats(allCats);
    }
   };

   var addAllCats = function(allCats){
      for (var i = 0 ; allCats.length > i ; i++) {
        searchRequest.categories_id.push(allCats[i].id);
      };
   };

   var formTags = function(tags) {
      searchRequest.tags=[];

      if (tags.length === 0) {
        searchRequest.tags = []; // It takes all words 
      }
      else {  
        for (var i = 0 ; tags.length > i ; i++) {
          searchRequest.tags.push(tags[i].tag);
        };
      }
   };

  var formRequest = function(allCats, tags){
      formCats(allCats);
      formTags(tags);
      return searchRequest
  };

  return formRequest
}]);
