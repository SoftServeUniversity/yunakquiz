
angular.module('yunakQuiz.userStatistic')

.controller('UserStatisticGeneralCtrl',['$scope','UserStatiticService','$location','getAccess',
	function($scope,UserStatiticService,$location,getAccess) {
  
  $scope.tab = "general";

  if (getAccess('/admin/statistic','user')) {
    init();
  } else {
    $location.path( "/404" );
  };

  function init(){ 
    UserStatiticService.getStat($scope.tab)
      .success(function(data, status, headers, config) {
        $scope.statistic = data; 
      })
      .error(function(data){
        $scope.error = data;
      });
  };

}])

.controller('UserStatisticListCtrl',['$scope','UserStatiticService', 'CONFIG','getAccess','$location',
	function($scope,UserStatiticService,CONFIG,getAccess,$location) {
   $scope.tab = "list";
   $scope.dateFormat = CONFIG.DATE_FORMAT;

  if (getAccess('/admin/statistic','user')) {
    init();
  } else {
    $location.path( "/404" );
  };
  
  function init(){
    UserStatiticService.getStat($scope.tab)
      .success(function(data, status, headers, config) {
  		  $scope.quizzes = data;
    })
      .error(function(data){
        $scope.error = data;
    });
  };


}])


