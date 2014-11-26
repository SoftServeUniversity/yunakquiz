'use strict';

guestSearch.directive('myGuestSearchCat', [ function() {
  return {
    restrict: 'E',
    templateUrl: './modules/guest-search/directives/guest-search-cat-tmpl.html',
    controller: function($scope, categoriesQuery) {

      // Reciving all Categories from server in one 
      // array 
      categoriesQuery.getAllCategories().success(function(data) {
        $scope.allCats = data;
      }).error(function(data) {
        $scope.searchError = 2; // need to change
      });

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

      $scope.button = function() {
        $scope.myClick();
      }; 

    },
    scope: { 
      myClick: '&button',
      allCats: '=categories' 
      }
  }
}]);