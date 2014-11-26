'use strict';
/** QuizResult controller  */
angular.module('yunakQuiz.assessments')
.controller('QuizResultCtrl', 
	['$scope','QuizPassService', '$location', 
	function($scope, QuizPassService, $location) {

	/** Get Quiz */
	$scope.quiz = QuizPassService.quiz;
	
	/** Redirect to main page if quiz was not  passed */
	if (!$scope.quiz.id) { $location.path('/') }

	/** Redirection to pass quiz again  */
	$scope.redirectToAssessment = function(){
		$location.path('/assessments/'+$scope.quiz.id);	
	};
	
	
}]);
