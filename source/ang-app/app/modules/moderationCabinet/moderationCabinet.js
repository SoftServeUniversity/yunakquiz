angular.module('yunakQuiz.moderationCabinet', [])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider
  .when('/admin/moderationCabinet', {
    templateUrl: 'modules/moderationCabinet/moderationCabinet.html',
    controller: 'CabinetCtrl',
    queryFn: "queryListModer"
  })
  .when('/admin/moderationCabinet/review/:quiz_id', {
    templateUrl: 'modules/moderationCabinet/review.html',
    controller: 'ReviewCtrl'
  })  
  .when('/admin/moderationCabinet/:state', {
    templateUrl: 'modules/moderationCabinet/moderationCabinet.html',
    controller: 'CabinetCtrl', 
    queryFn: "queryListModer"
  })
 
}]);

var search = angular.module('yunakQuiz.moderationCabinet');
search.directive('guestsearchcat', [ function() {
  return {
    restrict: 'EA',
    scope: {searchRequest: '=', filterFn: '&' },
    controller: 'guestSearchCatsController',
    templateUrl: './modules/moderationCabinet/guest-search-cat-tmpl.html',
    replace: true
  }
}]);

search.controller('guestSearchCatsController', ['$scope', '$http', function($scope, $http){

  $http.get('http://localhost:9292/guest-search').success(function(data) {
    $scope.allCats = data;
  }).error(function(data) {
      console.log(data);
    });

  $scope.selectSubCat = function(allCats, parCat) {
    parCat.search = !parCat.search;
    for (var i = 0 ; allCats.length > i ; i++){
      if (allCats[i].category_id == parCat.id) {
        allCats[i].search = parCat.search;
      };
    };
  };

   $scope.searchRequest = {categories_id:[]};

   $scope.formCats = function(allCats){ 
    $scope.searchRequest.categories_id = [];
    for (var i = 0 ; allCats.length > i ; i++) {
      if (allCats[i].search){
        $scope.searchRequest.categories_id.push(allCats[i].id);
      };
    };
    if ($scope.searchRequest.categories_id.length === 0) {
      $scope.addAllCats(allCats);
    }
   };

   $scope.addAllCats = function(allCats){
      for (var i = 0 ; allCats.length > i ; i++) {
        $scope.searchRequest.categories_id.push(allCats[i].id);
      };
   };

  $scope.search = function(){
    $scope.formCats($scope.allCats);
    $scope.filterFn();
  };

}]);

