
  var  app = angular.module('yunakQuiz.subcategory', ['ngRoute', 'yunakQuiz.categoriesContainer', 'yunakQuiz.guestSearch', 'ui.bootstrap']);

    app.config(['$routeProvider',
      function($routeProvider) {
        $routeProvider.
        when('/subcategory/:id', {
          templateUrl: 'modules/subcategory/subcategory.html',
          //controller: 'subcatCtrl'
        })
      }
    ]);
    

    app.controller("subcatCtrl", 
      ['$scope', '$http', '$routeParams', '$timeout', 'subcategoryFactory', 'categoriesQuery', 'guestSearchFactory',
      function ($scope, $http, $routeParams, $timeout, subcategoryFactory, categoriesQuery, guestSearchFactory) {
        $scope.searchTags;
        var searchData = {categories_id: [+$routeParams.id]};
        searchData.currentPage = 0;
        categoriesQuery.getCategoryById($routeParams.id)
        .success(function(data) {
            $scope.subcategory = data[0];
        });

        subcategoryFactory.getLastQuizzes($routeParams.id)
        .success(function(data) {
            $scope.searchResults = subcategoryFactory.doArr(data)
        });
        
        
        $scope.check = function() {
          
          if ($scope.searchTags.length >= 3) {
            searchData.tags = $scope.searchTags.toLowerCase().split(' ');
            
            guestSearchFactory.guestSearch(searchData).success(function(data){
              
              $scope.searchResults = guestSearchFactory.tagsToArray(data.result);
              $scope.currentPage = 1;
              $scope.totalItems = data.length;

            }).error(function(data) {
              $scope.currentPage = 1;
              $scope.totalItems = 0;
            });
          };

          if($scope.searchTags.length == 0) {
            subcategoryFactory.getLastQuizzes($routeParams.id).success(function(data) {
            $scope.searchResults = subcategoryFactory.doArr(data)});
          };

        };


        $scope.pageChanged = function() {
            searchData.currentPage = ($scope.currentPage-1);
            guestSearchFactory.guestSearch(searchData)
            .success(function(data){
                $scope.searchResults = guestSearchFactory.tagsToArray(data.result);
            }).error(function(data){
              $scope.currentPage = 1;
              $scope.totalItems = 0;
            });
        };
      }]);


    app.factory("subcategoryFactory",['$http','$routeParams', function ($http, $routeParams) {
        return {
                getLastQuizzes: function(id) {
                      return $http.get('http://localhost:9292/last_quizzes/' + id)
                },

                doArr: function(data){
                      for (var i = 0; i < data.length; i++) {
                          var arr =[];
                          for(var j = 0; j<data[i].allTags.length; j++){
                               arr.push(data[i].allTags[j].tag);
                          }; 
                          data[i].allTags = arr;
                      };
                      return data
                }
        }
    }]);