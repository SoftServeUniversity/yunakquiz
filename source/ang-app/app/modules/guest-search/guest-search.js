"use strict";

(function (){
	var  app = angular.module('yunakQuiz.guestSearch', ['ngRoute','yunakQuiz.subcategory','yunakQuiz.categoriesContainer']);

		app.config(['$routeProvider',
      		function($routeProvider) {
            $routeProvider.
            	when('/guest-search', {
              	templateUrl: './modules/guest-search/guest-search-page.html',
                controller: 'SearchCtrl'
            })
      	}
    ]);      

//==============================================================================
    
    //Ctrl for guest-search-page
    app.controller('SearchCtrl', 
      ['$scope', '$http', 'searchTag', '$timeout', 'catsById', function ($scope, $http, searchTag, $timeout, catsById) {
        
        var searchTimeout;
        $scope.searchTags = [];
        $scope.searchData = {categories_id:[]}
        $scope.parCategories = {};
        $scope.subCategories = {};
        $scope.selectedCategories = {};
        $scope.searchResults = {};
  
        //-- add the id to an array with a true-ey value
        $scope.addRemClassActiveSingleCat = function(subCatId) {
        //-- Set selected categiries as true/false
          if($scope.selectedCategories[subCatId]) {
            $scope.selectedCategories[subCatId] = false;
          } else {
            $scope.selectedCategories[subCatId] = true;
            };
        };

        $scope.addRemClassActiveParCat = function(id) {
        //-- Set selected categiries as true/false
          if($scope.selectedCategories[id]) {
            $scope.selectedCategories[id] = false;
          } else {
            $scope.selectedCategories[id] = true;
            };
            for(var subKey in $scope.subCategories){
              if($scope.subCategories[subKey].category_id == id) {
                $scope.selectedCategories[$scope.subCategories[subKey].id] = $scope.selectedCategories[id]; 
              };
            };
        };
        // Getting all parent categories
        catsById.get('parcat' ,function(data){
          $scope.parCategories = data;
        });
        // Getting all sub categories
        catsById.get('subcat' ,function(data){
          $scope.subCategories = data;
        });
        // wach function for live search
        $scope.$watch('searchTags', function (val) {
          if (searchTimeout) $timeout.cancel(searchTimeout);
            searchTimeout = $timeout(function() {
              $scope.check($scope.searchData);
            }, 1000);   
        });
        // Check if minimum 3 chars in search request and adding categories to request
        $scope.check =  function (searchData) {
          if($scope.searchTags.length >= 3){
            searchData = {categories_id:[]}
            for(var key in $scope.selectedCategories){
              if($scope.selectedCategories[key] == true){
                searchData.categories_id.push(key);
              };
            };
            searchData.tags = $scope.searchTags.split(' '); // tags:['teg','teg8','teg10' ...]}
            searchTag.request(searchData, function(data){
              $scope.searchResults = data;
            });
          };
        };
    }]);
 })();