
angular.module('yunakQuiz.cabinet')
.controller('CabinetCtrl', 
  ['$scope', 'QuizResourceService', 'CabinetService', '$routeParams', '$modal', '$route', 'getAccess', '$location','paginationConfig',
  function($scope, QuizResourceService, CabinetService, $routeParams, $modal, $route, getAccess, $location,paginationConfig) {
  
  $scope.items_per_page = paginationConfig.items_per_page;

  var queryFnName = $route.current.queryFn;
  $scope.tab = $routeParams.state || "published";

  getAccess($route.current.permision).then(function(data){
    if (data) {$scope.searchQuery();} else{$location.path( "/403" );}
  });

  $scope.outputData={
    currentPage: 1,
    itemsPerPage: paginationConfig.items_per_page[0],
    searchData:'',
    categoryFilter: []
  };

  $scope.quizUrl = '#/assessments/';

  $scope.searchQuery = function(){
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
        $scope.updateData(data);        
      })
      .error(function(data){
        $scope.error = data;
      });
  };

  $scope.updateData = function(data){
    $scope.quizzes = data.quizzes;
    $scope.totalItems = data.totalItems;
  };

  $scope.deleteQuiz= function(quizId){
    var modalDelete = $modal.open({
      templateUrl: 'modules/cabinet/quiz_delete_modal.html',
      controller: 'ModalDeleteCtrl',
      size: 'sm'
    });
    modalDelete.result.then(function () {
      QuizResourceService.delete(quizId).success(function(data) {
        $scope.searchQuery();
      });
    });
  };
  
  $scope.categoryFilter = function(){
    $scope.outputData.categoryFilter = $scope.searchRequest.categories_id;
    $scope.searchQuery();
  };
}]);

