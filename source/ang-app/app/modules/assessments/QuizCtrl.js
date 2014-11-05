'use strict';
/** Quiz controller  */
yunakQuizApp.controller('QuizCtrl', ['$scope','QuizData', '$routeParams', '$location', function($scope,QuizData, $routeParams, $location) {

	/** get quiz by _id from QuizData service  */
	QuizData.get($routeParams.quiz_id)
		.success(function(data, status, headers, config){
			$scope.quiz = data;
		})
		.error(function(data){
			$location.path('/404/');
		});
	      
	/** mark checked answers, and call validate function  */
	$scope.checkAnswer = function(answer,question){
		answer.checked = !answer.checked;
		$scope.checkQuestion(question);
	};

	/** Validate if all questions in quiz has marked answers  */
	$scope.checkQuiz = function (quiz){
		var questions = quiz.questions;
		var quizValid=true;
		for(var i =0; i < questions.length; i++){
			$scope.checkQuestion(questions[i]);
			if(questions[i].invalid){
				quizValid = false;
			};
		};
		return quizValid;
	};

	/** Validate if question has at least one answer picked  */
	$scope.checkQuestion = function (question){
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
		if ($scope.checkQuiz($scope.quiz)) {
			QuizData.quiz = $scope.quiz;
			$location.path($location.path()+'/result');	
		};
	};
}]);
