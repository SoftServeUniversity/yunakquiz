'use strict';
/** Quiz controller  */
yunakQuizApp.controller('QuizCtrl', ['$scope','QuizData', '$routeParams', '$location', function($scope,QuizData, $routeParams, $location) {

	/** get quiz by _id from QuizData service  */
	QuizData.get($routeParams.quiz_id, function(data){
	      $scope.quiz = data; 
	    });


	/** mark checked answers, and call validate function  */
	$scope.checkAnswer = function(answer,question){
		
		answer.checked = !answer.checked;
		checkQuestion(question);
	};

	/** Validate if all questions in quiz has marked answers  */
	function checkQuiz(quiz){
		var questions = quiz.questions;
		var quizValid=true;
		for(var i =0; i < questions.length; i++){
			checkQuestion(questions[i]);
			if(questions[i].invalid){
				quizValid = false;
			};
		};
		return quizValid;
	};

	/** Validate if question has at least one answer picked  */
	function checkQuestion(question){
		question.invalid=true;
		for(var y=0; y<question.answers.length; y++){
			if(question.answers[y].checked){
				question.invalid=false;
			}
			else {
				question.answers[y].checked = false
			}
		};
	};

	/** Redirect to result-page if quiz is valid  */
	$scope.passQuiz = function(){
		if (checkQuiz($scope.quiz)) {
			QuizData.quiz = $scope.quiz;
			$location.path($location.path()+'/result');	
		};
	};
}]);

/** AssessmentResult controller  */
yunakQuizApp.controller('AssessmentsResultCtrl', ['$scope','QuizData', '$routeParams', '$location', function($scope, QuizData, $routeParams, $location) {

	/** get quiz object with picked answers   */
	$scope.assessment = QuizData.quiz;

	/** Check all questions in quiz */
	function checkQuestions (){
		for (var i=0; i<$scope.assessment.questions.length; i++){
			$scope.assessment.questions[i].nice = checkAnswer($scope.assessment.questions[i]);
		}
	}

	/** check question for correct answers  */
	function checkAnswer (question){
		var correct=true;
		for (var i=0;i<question.answers.length; i++){
			if(question.answers[i].correct){
				if(question.answers[i].checked){
					correct= true && correct;
				}
				else {
					correct= false;
				}
			}
			else if(question.answers[i].checked){
				correct= false;
			}
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
	if ($scope.assessment.questions)
	{
		checkQuestions();
		$scope.counter = $scope.correctAnswerCounter();
	}	
	else 
	{
		$scope.redirectToAssessment();
	}

	
}]);

/** Quiz Edit controller  */
yunakQuizApp.controller('QuizEditCtrl', ['$scope','QuizData', '$routeParams', '$location', function($scope, QuizData, $routeParams, $location) {

	/** get quiz object */
	$scope.assessment = QuizData.quiz;

	
}]);