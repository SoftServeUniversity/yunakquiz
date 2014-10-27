'use strict';
/** AssessmentResult controller  */
yunakQuizApp.controller('AssessmentsResultCtrl', ['$scope','QuizData', '$routeParams', '$location', function($scope, QuizData, $routeParams, $location) {

	/** get quiz object with picked answers   */
	$scope.assessment = QuizData.quiz;

	/** Check all questions in quiz */
	$scope.checkQuestions = function (){
		for (var i=0; i<$scope.assessment.questions.length; i++){
			$scope.assessment.questions[i].nice = $scope.checkAnswer($scope.assessment.questions[i]);
		}
	}

	/** check question for correct answers  */
	$scope.checkAnswer = function(question){
		var correct=true;
		for (var i=0;i<question.answers.length; i++){
			if(question.answers[i].correct){
				if(question.answers[i].checked){
					correct= true && correct;
				} 
				else {correct= false;}
			} 
			else if(question.answers[i].checked){correct= false;}
		}
		return correct;
	}


	/** count quiz score */
	$scope.correctAnswerCounter = function(){
		var questions = $scope.assessment.questions;
		var counter = 0;
		for (var i=0;i<questions.length; i++){
			if (questions[i].nice) {counter++}
		}
		var count = (counter / questions.length)*100 ;
		var count = Math.round(count);
		return count;

	}

	/** redirection to pass quiz again  */
	$scope.redirectToAssessment = function(){
		$location.path('/assessments/'+$routeParams.quiz_id);	
	};
	/** check questions and count score if we have quiz object  */
	if ($scope.assessment.questions){
		$scope.checkQuestions();
		$scope.counter = $scope.correctAnswerCounter();
	}	
	else {
		$scope.redirectToAssessment();
	};

}]);
