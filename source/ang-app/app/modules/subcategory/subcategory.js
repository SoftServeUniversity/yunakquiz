
  var  app = angular.module('yunakQuiz.subcategory', ['ngRoute', 'yunakQuiz.categoriesContainer', 'yunakQuiz.guestSearch', 'ui.bootstrap', 'ngTagsInput']);

    app.config(['$routeProvider',
      function($routeProvider) {
        $routeProvider.
        when('/subcategory/:id', {
          templateUrl: 'modules/subcategory/subcategory.html',
          controller: 'subcatCtrl'
        })
      }
    ]);
    

    app.controller("subcatCtrl", 
      ['$scope', '$http', '$routeParams', '$timeout', 'subcategoryFactory', 'categoriesQuery', 'guestSearchFactory',
      function ($scope, $http, $routeParams, $timeout, subcategoryFactory, categoriesQuery, guestSearchFactory) {
        //init
        var itemsPerPage = 10;
        $scope.searchTags = [];
        $scope.currentPage = 1;
        $scope.subcategory ={};
        $scope.searchData = {
            categories_id: [+$routeParams.id],
            tags:[],
            currentPage:0
        };
        // getting current category object to set its name on page
        categoriesQuery.getCategoryById($routeParams.id)
        .success(function(data) {
            $scope.subcategory = data[0];
        });
        
        //getting last quizzes in current category,transforming tags string into array
        $scope.lastQuizzes = function(){
            subcategoryFactory.getLastQuizzes($routeParams.id)
                .success(function(data) {
                    $scope.searchResults = guestSearchFactory.tagsToArray(data);
                    $scope.totalItems = itemsPerPage;
                });
        };
        $scope.lastQuizzes();

        // adding tags to search line, checking them to prevent doubling
        $scope.addToSearch = function(tag, searchTags) {
            subcategoryFactory.checkingTags(tag,searchTags)
        };
       
        $scope.getResults = function(){
            guestSearchFactory.guestSearch($scope.searchData)
            .success(function(data){
                $scope.searchResults = guestSearchFactory.tagsToArray(data.result);
                $scope.totalItems = data.length;
            }).error(function(data) {
                  $scope.totalItems = 0;
                });
        }
        
        $scope.search = function() {
            //if empty line -showing last quizzes of current category again 
            $scope.searchData.tags=[];//removing previous tags in searchData
            if ($scope.searchTags.length == 0) {
                $scope.lastQuizzes()
            } else {
                //adding tags to search request
                subcategoryFactory.addingTags($scope.searchData,$scope.searchTags)
                //sending search request
                $scope.getResults()
            }
        };

        //sending another request when pagination changed
        $scope.changingPage = function() {
            if ($scope.searchTags.length != 0) {
                $scope.searchData.currentPage = ($scope.currentPage-1);
                $scope.getResults()
            }
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
