
angular.module('yunakQuiz.userStatistic')

.controller('UserStatisticGeneralCtrl',['$scope','UserStatisticService','$location','getAccess',
	function($scope,UserStatisticService,$location,getAccess) {
  
  $scope.tab = "general";

  if (getAccess('/admin/statistic','user')) {
    UserStatisticService.get(getSuccess, getError);
  } else {
    $location.path( "/404" );
  };

  function getSuccess(data) {
    $scope.statistic = data
  };
  
  function getError(response) { 
    $scope.errorMsg = response.data || 'Дані не отримано'
  };

}])

.controller('UserStatisticListCtrl',
  ['$scope','UserStatisticService', 'CONFIG','getAccess','$location','paginationConfig',
	function($scope,UserStatisticService,CONFIG,getAccess,$location,paginationConfig) {
  
  $scope.tab = "list";
  $scope.dateFormat = CONFIG.DATE_FORMAT;
  $scope.items_per_page = paginationConfig.items_per_page;
  
  $scope.pagination={
    page : 1,
    perPage : paginationConfig.items_per_page[0]
  };

  $scope.query = function(){
    UserStatisticService.get($scope.pagination, getSuccess, getError);
  }

  if (getAccess('/admin/statistic','user')) {
    $scope.query()
  } else {
    $location.path( "/404" );
  };


  function getSuccess(data) {
    $scope.quizzes = data.result;
    $scope.totalItems = data.totalItems
  };
  
  function getError(response) { 
    $scope.errorMsg = response.data || 'Дані не отримано'
  };

}])


