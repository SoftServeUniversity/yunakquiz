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

      getTags: function(query){
            return $http.get('http://localhost:9292/tags/'+query);
          } 
    };
}]);
