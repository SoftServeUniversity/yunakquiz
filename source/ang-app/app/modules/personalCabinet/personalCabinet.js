'use strict';

angular.module('yunakQuiz.personalCabinet', ['ngRoute', 'ngResource', 'flow'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider
  			.when('/personal_cabinet/profile', {
	    		templateUrl: 'modules/personalCabinet/profile.html',
	    		controller: 'ProfileController',
	    		controllerAs: 'profile'
  			})
  			.when('/personal_cabinet/:status', {
	   			templateUrl: 'modules/personalCabinet/quizzestabs.html',
	    		controller: 'QuizzesTabsCtrl'
  			});
}])

.controller('PublishedCtrl', ['$scope', function($scope) {
	$scope.published = true;
	$scope.isActive = function(tab) {
		return $scope.currentTub == tab;
	};

}])
.controller('UnfinishedCtrl', ['$scope', function($scope) {
	$scope.unfinished = true;

}])
.controller('UnapprovedCtrl', [function() {

}])

.controller('QuizzesTabsCtrl', ['$scope', '$routeParams', 'QuizData', function($scope, $routeParams, QuizData) {
	
	$scope.activeTab = $routeParams.status;
	$scope.quizUrl = "http://localhost:8000/#/assessments/";
	$scope.quizEditUrl = "http://localhost:8000/#/admin/assessments/";

	
	$scope.getQuizess = function(){
		QuizData.getAll($scope.activeTab)
			.success(function(data, status, headers, config){
				$scope.quizzes = data;
			})
			.error(function(data){
				$location.path('/404/');
			});
	};
	 
	$scope.deleteQuiz = function(quiz_id) {
      if (confirm("Ви точно бажаєти видалити тест №"+quiz_id)) {
        QuizData.deleteQuiz(quiz_id)
    	  .success(function(data){
    	    $scope.getQuizess();
    	  });
      }
	};
	$scope.getQuizess();
}]);
