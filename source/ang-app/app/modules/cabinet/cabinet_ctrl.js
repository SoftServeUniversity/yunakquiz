
angular.module('yunakQuiz.cabinet')
.controller('CabinetCtrl', 
  ['$scope', 'QuizResource', 'CabinetService', '$routeParams', '$modal', '$route',
   'getAccess', '$location','paginationConfig','guestSearchFactory',
  function($scope, QuizResource, CabinetService, $routeParams, $modal, $route,
   getAccess, $location,paginationConfig, guestSearchFactory) {
  
  /** Set default values */
  $scope.items_per_page = paginationConfig.items_per_page;
  $scope.quizUrl = '#/assessments/';
  $scope.tab = $routeParams.state || "published";
  var queryFnName = $route.current.queryFn;
  
  $scope.outputData={
    currentPage: 1,
    itemsPerPage: paginationConfig.items_per_page[0],
    searchData:'',
    categoryFilter: []
  };

  /** Send query with new searc params */
  $scope.searchQuery = function(){
    if ($scope.allCats){
      $scope.outputData.categoryFilter = guestSearchFactory.checkAllCats($scope.allCats);
    }
    $scope.outputData.currentPage = 1;
    $scope.queryList();
  };

  /** Clear input and send new query */
  $scope.clearInput = function() {
    $scope.outputData.searchData='';
    $scope.searchQuery();
  };

  /** Query list of Quizzess. Query function name depends on route params*/
  $scope.queryList = function() {
    CabinetService[queryFnName]($scope.tab, $scope.outputData)
      .success(function(data, status, headers, config) {
        updateData(data);        
      })
      .error(function(data){
        $scope.error = data;
      });
  };

  /** Update data */
  function updateData(data){
    $scope.quizzes = data.quizzes;
    $scope.totalItems = data.totalItems;
  };

  /** Modal windows for Quiz deletion */
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

  /** Check access to this page */
  getAccess($location.path(),$route.current.permission).then(
    function () { $scope.queryList(); },
    function () { $location.path( "/404" ); }
  );

}]);

