'use strict'; 

//Ctrl for guest search page
guestSearch.controller('SearchCtrl', ['$scope', '$http', 
  'guestSearchFactory',  
  function ($scope, $http, guestSearchFactory) {
        
  // Variable initalization 
  $scope.allCats = [];
  $scope.tags = [];
  $scope.searchResults = {};
  $scope.searchError = 0;

  // Pagination part
  // Init pagination part 
  $scope.totalItems = 0;
  $scope.currentPage = 1;
        
  // Function that creates searchRequest object and
  // Make search request 
  // and checks recived data
  $scope.searchData = function(allCats) {

    // Clean searchRequest variable
    $scope.searchRequest = {categories_id:[], tags:[]};

    // Writing selected cat in search request
    $scope.searchRequest.categories_id=guestSearchFactory.checkAllCats(allCats);
    
    // Adding all tags to request
    // and all tags to lower case 
    for (var i = 0 ; $scope.tags.length > i ; i++) {
      $scope.searchRequest.tags.push($scope.tags[i].text.toLowerCase());
    };

    // Check if there were some tags
    // if not search response all quizzes
    if ($scope.searchRequest.tags.length === 0) {
      $scope.searchRequest.tags = ['_']; // It takes all words 
    };

    $scope.searchRequest.currentPage = 0;

    // Main request to server for search
    // If it empty show error
    guestSearchFactory.guestSearch($scope.searchRequest).success(function(data){
      if (data.result.length === 0) {
        
        $scope.searchResults = {};
        // Add error message
        $scope.searchError = 1;
        
        // Reset paginating 
        $scope.currentPage = 1;
        $scope.totalItems = 0;

      } else {
        $scope.searchResults = guestSearchFactory.tagsToArray(data.result);

        // Delete error message if it was
        $scope.searchError = 0;

        // Length of paginating 
        $scope.totalItems = data.length;
        $scope.currentPage = 1;
      };

    }).error(function(data) {
      
      $scope.currentPage = 1;
      $scope.totalItems = 0;
      $scope.searchResults = {};

      // Show error message 
      $scope.searchError = 2;
    });
  };

  // Adding tags from results container 
  // To input search and check if same 
  // Tags are in tag array
  $scope.addTag = function(tag) {

    // Avoid duplication in tags 
    // And if it founds it writes 
    // in var duplicateFound
    for (var i = 0 ; $scope.tags.length > i ; i++) {
      if ($scope.tags[i].text === tag) {
        var duplicateFound = true;
      }; 
    };

    if (!duplicateFound) {
      var text = {text: tag}
      $scope.tags.push(text);
      // Set variable to false to avoid errors
      var duplicateFound = false;
    };
  };

  // Function that called when page in pagination is 
  // Changed 
  $scope.pageChanged = function() {

    // Giving info on what page we are now 
    $scope.searchRequest.currentPage = ($scope.currentPage-1);

    // And request to server 
    guestSearchFactory.guestSearch($scope.searchRequest).success(function(data){

      $scope.searchResults = guestSearchFactory.tagsToArray(data.result);

    }).error(function(data){
      $scope.searchResults = {};
      $scope.currentPage = 1;
      $scope.totalItems = 0;
      // Show error message 
      $scope.searchError = 2;
    });
  };

}]);
