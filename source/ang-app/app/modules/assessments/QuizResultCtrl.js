'use strict';
/** QuizResult controller  */
yunakQuizApp.controller('QuizResultCtrl', 
	['$scope','QuizService', '$location', 
	function($scope, QuizService, $location) {

	/**    */
	$scope.quiz = QuizService.quiz;
	if (!$scope.quiz.id) {
		$location.path('/');	
	}

	/** redirection to pass quiz again  */
	$scope.redirectToAssessment = function(){
		$location.path('/assessments/'+$scope.quiz.id);	
	};
	
	
}]);
