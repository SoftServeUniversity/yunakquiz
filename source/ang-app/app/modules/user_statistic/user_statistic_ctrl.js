
angular.module('yunakQuiz.userStatistic')

.controller('UserStatisticGeneralCtrl',['$scope','UserStatiticService','CONFIG',
	function($scope,UserStatiticService,CONFIG) {
  
   $scope.tab = "general";
   	UserStatiticService.getStat($scope.tab)
      .success(function(data, status, headers, config) {
        $scope.statistic = data; 
        roundGrade($scope.statistic.passed);       
      })
      .error(function(data){
        $scope.error = data;
      });

    function roundGrade(arr){
      	for(var count = 0, i = 0; i<arr.length; i++){
      		count +=arr[i]
      	}
      	var res = count/arr.length || 0;
        $scope.statistic.round = res.toFixed(CONFIG.SCORE_ROUND);
    };
 
}])

.controller('UserStatisticListCtrl',['$scope','UserStatiticService', 'CONFIG',
	function($scope,UserStatiticService,CONFIG) {
   $scope.tab = "list";
   $scope.dateFormat = CONFIG.DATE_FORMAT;
   
   	UserStatiticService.getStat($scope.tab)
      .success(function(data, status, headers, config) {
		$scope.quizzes = data;    
    })
      .error(function(data){
        $scope.error = data;
    });

    $scope.maxGrade = function(quiz){
    	quiz.grade =[];
    	quiz.results.forEach(function(item){
    		quiz.grade.push(item.grade);
    	});
    	return quiz.grade.sort(function(a, b){return b-a})[0];
    };
 		
    $scope.midGrade = function(arr){
    	for(var count = 0, i = 0; i<arr.length; i++){
    		count +=arr[i]
    	}
    	return (count/arr.length).toFixed(CONFIG.SCORE_ROUND);
    };

}])


