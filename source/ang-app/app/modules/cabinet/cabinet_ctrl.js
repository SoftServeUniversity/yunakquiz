
angular.module('yunakQuiz.cabinet')
.controller('CabinetCtrl', 
  ['$scope', 'QuizResource', 'CabinetService', '$routeParams', '$modal', '$route',
   'getAccess', '$location','paginationConfig','guestSearchFactory',
  function($scope, QuizResource, CabinetService, $routeParams, $modal, $route,
   getAccess, $location,paginationConfig, guestSearchFactory) {
  
  $scope.items_per_page = paginationConfig.items_per_page;
  $scope.quizUrl = '#/assessments/';

  var queryFnName = $route.current.queryFn;
  $scope.tab = $routeParams.state || "published";

  $scope.outputData={
    currentPage: 1,
    itemsPerPage: paginationConfig.items_per_page[0],
    searchData:'',
    categoryFilter: []
  };

  $scope.searchQuery = function(){
    if ($scope.allCats){
      $scope.outputData.categoryFilter = guestSearchFactory.checkAllCats($scope.allCats);
    }
    $scope.outputData.currentPage = 1;
    $scope.queryList();
  };

  $scope.clearInput = function() {
    $scope.outputData.searchData='';
    $scope.searchQuery();
  };

  $scope.queryList = function() {
    CabinetService[queryFnName]($scope.tab, $scope.outputData)
      .success(function(data, status, headers, config) {
        updateData(data);        
      })
      .error(function(data){
        $scope.error = data;
      });
  };

  function updateData(data){
    $scope.quizzes = data.quizzes;
    $scope.totalItems = data.totalItems;
  };

  $scope.deleteQuiz= function(quizId){
    var modalDelete = $modal.open({
      templateUrl: 'modules/cabinet/quiz_delete_modal.html',
      controller: 'ModalDeleteCtrl',
      size: 'sm'
    }).result;

    modalDelete.then(function () {
      QuizResource.delete({id:quizId}, function(){ $scope.searchQuery() })
    });
  };

  if (getAccess($location.path(),$route.current.permission)) {
    $scope.queryList();
  } else {
    $location.path( "/404" );
  };
  
}]);

