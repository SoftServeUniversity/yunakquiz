'use strict';

angular.module('yunakQuiz.personalCabinet', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider
  			.when('/personal_cabinet/published', {
	    		templateUrl: 'modules/personalCabinet/published.html',
	    		controller: 'PublishedCtrl'
  			})
  			.when('/personal_cabinet/unfinished', {
	    		templateUrl: 'modules/personalCabinet/unfinished.html',
	    		controller: 'UnfinishedCtrl'
  			})
  			.when('/personal_cabinet/unapproved', {
	    		templateUrl: 'modules/personalCabinet/unapproved.html',
	    		controller: 'UnapprovedCtrl'
  			})
  			.when('/personal_cabinet/created', {
	    		templateUrl: 'modules/personalCabinet/created.html',
	    		controller: 'CreatedCtrl'
  			})
  			.when('/personal_cabinet/profile', {
	    		templateUrl: 'modules/personalCabinet/profile.html',
	    		controller: 'ProfileCtrl'
  			});
}])

.controller('PublishedCtrl', ['$scope', function($scope) {
	$scope.published = true;
	$scope.isActive = function(tab) {
		return $scope.currentTub == tab;
	}

}])
.controller('UnfinishedCtrl', ['$scope', function($scope) {
	$scope.unfinished = true;

}])
.controller('UnapprovedCtrl', [function() {

}])

.controller('CreatedCtrl', ['$scope', 'QuizData', function($scope, QuizData) {
	$scope.quizUrl = "http://localhost:8000/#/assessments/";
	$scope.quizEditUrl = "http://localhost:8000/#/admin/assessments/"

	QuizData.getAll("draft")
		.success(function(data, status, headers, config){
			$scope.quizzes = data;
		})
		.error(function(data){
			$location.path('/404/');
		});
	 


	$scope.deleteQuiz = function(quiz_id) {
		confirm(quiz_id);
	};
}])

.controller('ProfileCtrl', [function() {

}]);


