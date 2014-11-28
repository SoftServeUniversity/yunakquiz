'use strict';

  guestSearch.factory('guestSearchFactory', ['$http', function($http){
    return {
      getAllCats: function() {
        return $http.get('http://localhost:9292/guest-search');
      },

      // Function that takes response object
      // And convert allTags from string to array
      tagsToArray: function(dataArray) {
                
        for (var i = 0 ; dataArray.length > i ; i++ ) {
          dataArray[i].allTags = dataArray[i].allTags.split(' ');
        };

        return dataArray;
                
      },
            
      guestSearch: function(searchData) {
        return $http.post('http://localhost:9292/search', searchData);
      },


      // Recives allCats and generate 
      // array of numbers and returns it
      checkAllCats: function(allCats) {

        var searchRequestCategoriesId = [];

        // If search key is true adding to searchRequest array
        for (var i = 0 ; allCats.length > i ; i++) {
          if (allCats[i].search){
            searchRequestCategoriesId.push(allCats[i].id);
          };
        };

        // Check if there were some categories_id 
        // if not then push all ids from allCats
        if (searchRequestCategoriesId.length === 0) {
          for (var i = 0 ; allCats.length > i ; i++) {
            searchRequestCategoriesId.push(allCats[i].id);
          };
        };
         return searchRequestCategoriesId;
      }, 

      //
      checkTags: function(tags){

        // For LIKE method in sqlite
        // that returns all results
        var allWords = ['_']
        var checkedTags = [];

        if (tags.length === 0) {
          checkedTags = allWords;
        } else {

          // Adding all tags to request
          // and all tags to lower case 
          for (var i = 0 ; tags.length > i ; i++) {
            checkedTags.push(tags[i].text.toLowerCase());
          };
        };

        return checkedTags;
      }

    };
}]);
