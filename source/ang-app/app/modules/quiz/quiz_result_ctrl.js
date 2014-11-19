'use strict';
/** QuizResult controller  */
angular.module('yunakQuiz.assessments')
.controller('QuizResultCtrl', 
	['$scope','QuizPassService', '$location', 
	function($scope, QuizPassService, $location) {

	/**    */
	$scope.quiz = QuizPassService.quiz;
	if (!$scope.quiz.id) {
		$location.path('/');	
	}

	/** redirection to pass quiz again  */
	$scope.redirectToAssessment = function(){
		$location.path('/assessments/'+$scope.quiz.id);	
	};
	
	
}]);
