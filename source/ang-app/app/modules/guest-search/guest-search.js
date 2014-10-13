"use strict";

(function (){
	var  app = angular.module('yunakQuiz.guestSearch' ,['ngRoute']);

		app.config(['$routeProvider',
      		function($routeProvider) {
            $routeProvider.
            	when('/guest-search', {
              	templateUrl: './modules/guest-search/guest-search-page.html',
              	controller: 'SearchCtrl'
            })
      	}
    ]);      

    //Ctrl for guest-search-page
    app.controller('SearchCtrl', function SearchCtrl($scope, $http, searchFactory){

      //Creating the filter for search
      $http.get("http://localhost:9292/guest-search")
      .success(function(data){
        $scope.allCats = data;
        $scope.keyWord="teg1"; 
        searchFactory($scope.allCats, $scope.keyWord);  
      });
      
    });

    //Factory that sends post request and return search results based on input data
    app.factory('searchFactory', function($http){
      return function(allCats, keyWord){
        //place for loop to clean allcats object

        var searchRequest = {
          tags: ['teg2'],
          categories: [1,2,3,4,6,7,8,9,10,11,12] 
        };
        //searchRequest.allCats[8].search = true; // just for testing
        //searchRequest.allCats[1].search = true; // just for testing

        console.log(searchRequest);

        var searchResult = {};

        $http.post("http://localhost:9292/search", searchRequest)
        .success(function (data){

          searchResult = data;

        });
        return searchResult;
      };
    });

})();