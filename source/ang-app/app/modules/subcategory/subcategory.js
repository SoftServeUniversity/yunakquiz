
  var  app = angular.module('yunakQuiz.subcategory', ['ngRoute', 'yunakQuiz.categoriesContainer', 'yunakQuiz.guestSearch', 'ui.bootstrap', 'ngTagsInput']);

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
        //init
        $scope.searchTags = [];
        $scope.currentPage = 1;
        $scope.searchData = {
            categories_id: [+$routeParams.id],
            tags:[],
            currentPage:0
        };
        var itemsPerPage = 10;
        // getting current category object to set its name on page
        categoriesQuery.getCategoryById($routeParams.id)
        .success(function(data) {
            $scope.subcategory = data[0];
        });
        
        // adding tags to search line, checking them to prevent doubling
        $scope.addToSearch = function(tag, searchTags) {
            subcategoryFactory.checkingTags(tag,searchTags)
        };

        //getting last quizzes in current category,transforming tags string into array
        subcategoryFactory.getLastQuizzes($routeParams.id)
        .success(function(data) {
            $scope.searchResults = guestSearchFactory.tagsToArray(data);
        });
        
        
        $scope.check = function() {
            //if empty line -showing last quizzes of current category again  
            if ($scope.searchTags.length == 0) {
                subcategoryFactory.getLastQuizzes($routeParams.id)
                .success(function(data) {
                    $scope.searchResults = guestSearchFactory.tagsToArray(data);
                    $scope.totalItems = itemsPerPage;
                });
            } else {
                //adding tags to search request
                subcategoryFactory.addingTags($scope.searchData,$scope.searchTags)
                //sending search request
                guestSearchFactory.guestSearch($scope.searchData)
                .success(function(data){
                    $scope.searchResults = guestSearchFactory.tagsToArray(data.result);
                    $scope.currentPage = 1;
                    $scope.totalItems = data.length;
                }).error(function(data) {
                  $scope.totalItems = 0;
                });
            }
        };

        //sending another request when pagination changed
        $scope.changingPage = function() {
            $scope.searchData.currentPage = ($scope.currentPage-1);
            guestSearchFactory.guestSearch($scope.searchData)
            .success(function(data){
                $scope.searchResults = guestSearchFactory.tagsToArray(data.result);
                $scope.totalItems = data.length;
            });
        };

    }]);


    app.factory("subcategoryFactory",['$http','$routeParams', function ($http, $routeParams) {
        return {
                getLastQuizzes: function(id) {
                    return $http.get('http://localhost:9292/last_quizzes/' + id)
                },
                checkingTags: function(tag, searchTags) {
                    if (searchTags.length) {
                      for(var i = 0; i < searchTags.length; i++) {
                        if (searchTags[i].text == tag) {
                            return
                        }
                      }
                    };
                    searchTags.push({text:tag})
                    return
                },
                addingTags:function(searchData,searchTags){
                      searchData.tags=[];
                      searchData.currentPage = 0;
                      for (var i =0; i< searchTags.length; i++) {
                            searchData.tags.push(searchTags[i].text)
                      } 
                }
        }
    }]);
