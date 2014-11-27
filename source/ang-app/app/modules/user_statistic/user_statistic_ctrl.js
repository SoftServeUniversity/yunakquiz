
angular.module('yunakQuiz.userStatistic')

.controller('UserStatisticGeneralCtrl',['$scope','UserStatisticService','$location','getAccess', '$route',
	function($scope,UserStatisticService,$location,getAccess, $route) {
  
  /** Set values */
  $scope.tab = "general";

  /** Check access to this page */
  getAccess($location.path(),$route.current.permission).then(
    function () { init(); },
    function () { $location.path( "/404" ); }
  );

  /** Initiation */
  function init(){
    UserStatisticService.get(
      function (data) {
        $scope.statistic = data
        setBarClass(data.average)
      },
      function (response) { 
        $scope.errorMsg = response.data || 'Дані не отримано'
      }
    );
  };  

  /** Set class for progressbar */
  function setBarClass(data){
    switch (true) {
      case (data>75):
        $scope.barClass = 'progress-bar-success';
        break;
      case (data>50 && data<=75):
        $scope.barClass = 'progress-bar-info';
        break;
      case (data>25 && data<=50):
        $scope.barClass = 'progress-bar-warning';
        break;
      case (data<=25):
        $scope.barClass = 'progress-bar-danger';
        break;
    };
  };
}])

.controller('UserStatisticListCtrl',
  ['$scope','UserStatisticService', 'CONFIG','getAccess','$location','paginationConfig',
	function($scope,UserStatisticService,CONFIG,getAccess,$location,paginationConfig) {
  
  /** Set values */
  $scope.tab = "list";
  $scope.dateFormat = CONFIG.DATE_FORMAT;
  $scope.items_per_page = paginationConfig.items_per_page;
  
  $scope.pagination={
    page : 1,
    perPage : paginationConfig.items_per_page[0]
  };

  /** Query statistics info */
  $scope.query = function(){
    UserStatisticService.get($scope.pagination, 
      function (data) {
        $scope.quizzes = data.result;
        $scope.totalItems = data.totalItems
      }, 
      function (response) { 
        $scope.errorMsg = response.data || 'Дані не отримано'
      }
    );
  };

  /** Check access to this page */
  if (getAccess('/admin/statistic','user')) {
    $scope.query()
  } else {
    $location.path( "/404" );
  };

}])


