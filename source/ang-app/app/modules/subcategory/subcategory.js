(function(){
  var  app = angular.module('yunakQuiz.subcategory' ,['ngRoute','yunakQuiz.categoriesContainer']);

    app.config(['$routeProvider',
      function($routeProvider) {
        $routeProvider.
          when('/subcategory/:id', {
          templateUrl: './modules/subcategory/subcategory.html',
          controller: 'subcatCtrl'
        })
      }
    ]);
    app.controller("subcatCtrl", 
      ['$scope', '$http', '$routeParams', 'searchTag', 'catsById',  
      function ($scope, $http, $routeParams, searchTag, catsById) {
        var subcat_id = $routeParams.id;
        var searchTimeout;
        $scope.searchTags = [];
        $scope.searchData = {categories_id:subcat_id}
        $scope.subcategory = {};

        catsById.get(subcat_id).success(function(data){
          $scope.subcategory = data; 
        });
        if($scope.searchTags.length == 0){
          $http.get('http://localhost:9292/subcat_quiz/' + subcat_id)
            .success(function(data){$scope.searchResults = data}); 
        };

        $scope.check =  function (searchData) {
          if($scope.searchTags.length >= 3){
            searchData.tags = $scope.searchTags.split(' '); // tags:['teg','teg8','teg10' ...]}
            searchTag.request(searchData, function(data){
              $scope.searchResults = data;
            });
          };
        };
    }]);

    app.factory("searchTag", ['$http', function ($http) {
      return {
        request : function(searchData, callback) {

          if(searchData.categories_id.length<1){
            searchData.categories_id = '0';
          };
          $http.post('http://localhost:9292/search', searchData).success(function(data){
            callback(data);
          });
        }
      };
    }]);
})();

