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
	QuizData.get($routeParams.quiz_id, function(data){
	      $scope.quiz = data; 
	    });

	$scope.categories =[
	{id:1, title:"Спорт"},
	{id:2, title:"Історія"},
	];
	$scope.sub1 = [
		{id:1, title:"Футбол"},
		{id:2, title:"Баскетбол"},
	];
	$scope.sub2 = [
		{id:1, title:"Історія України"},
		{id:2, title:"Історія Світу"},
	];

	$scope.getSubcats = function() {
		if($scope.selectedCat.id ==1){
			$scope.subcats = $scope.sub1;
		} else {$scope.subcats = $scope.sub2;}
	};

	$scope.deleteEmptyAnswer = function() { 
		var questions = $scope.quiz.questions;
		for (var i=0;i<questions.length; i++) { 
			var lastAnswer = questions[i].answers[questions[i].answers.length-1];
			if(!lastAnswer.title || !lastAnswer.title.trim()){
				questions[i].answers.pop();
  			};
		};
	};
		 

	$scope.addAnswer = function(question) {
		if(question.answers[question.answers.length-1].title){
				question.answers.push({correct:false});
		}
	};

	$scope.deleteAnswer = function(index, question) {
		question.answers.splice(index, 1);
	}

	$scope.setCorrectAnswer=function(answer){
		answer.correct = !answer.correct;
		};

	$scope.disableAddButton = function() {
		if($scope.quiz.questions[$scope.quiz.questions.length-1].title){
			$scope.addQuestionDisabled = false;
		}
		else{
			$scope.addQuestionDisabled = true;	
		}
	};
	
	$scope.validateQuiz = function(){
		var questions = $scope.quiz.questions;
		$scope.quiz.valid = true;
		for(var i = 0; i < questions.length;i++){
			$scope.validateQuestion(questions[i]);
			$scope.quiz.valid = $scope.quiz.valid && questions[i].valid;
		};

	};

	$scope.validateQuestion = function(question){
		var answers = question.answers;
		question.valid = false;
		for(var i = 0; i < answers.length;i++){
			question.valid = question.valid || answers[i].correct;
		};
	};

	$scope.addQuestion = function(){
		$scope.addQuestionDisabled = true;
		$scope.quiz.questions.push({answers:[{correct:false}]});
	};
		
	$scope.deleteQuestion=function(index){
		$scope.quiz.questions.splice(index,1);
	};




	/** Redirect to result-page if quiz is valid  */
	$scope.saveQuiz = function(){
		$scope.validateQuiz();
		if($scope.quiz.valid){
			$scope.quiz.state = 1;
			QuizData.save($scope.quiz);
		};
	};

	$scope.sendForReview = function(){
		$scope.validateQuiz();
		if($scope.quiz.valid){
			$scope.quiz.state = 2;
			QuizData.save($scope.quiz);
		};
	};
}]);

/** Quiz Create controller  */
yunakQuizApp.controller('QuizCreateCtrl', ['$scope','QuizData', '$routeParams', '$location', function($scope, QuizData, $routeParams, $location) {

	$scope.categories =[
	{id:1, title:"Спорт"},
	{id:2, title:"Історія"},
	];
	$scope.sub1 = [
		{id:1, title:"Футбол"},
		{id:2, title:"Баскетбол"},
	];
	$scope.sub2 = [
		{id:1, title:"Історія України"},
		{id:2, title:"Історія Світу"},
	];

	$scope.getSubcats = function() {
		if($scope.selectedCat.id ==1){
			$scope.subcats = $scope.sub1;
		} else {$scope.subcats = $scope.sub2;}
	};


	$scope.init = function() {
		
		$scope.quiz = {};
		$scope.quiz.questions = [];
		$scope.addQuestion();

	};

	$scope.addAnswer = function(question) {
		// if(question.answers[question.answers.length-1].title){
				question.answers.push({correct:false});
		// }
	};

	$scope.deleteAnswer = function(index, question) {
		question.answers.splice(index, 1);
	}

	$scope.setCorrectAnswer=function(question,answer){
		question.invalid = false;
		answer.correct = !answer.correct;
		};

	$scope.disableAddButton = function() {
		if($scope.quiz.questions[$scope.quiz.questions.length-1].title){
			$scope.addQuestionDisabled = false;
		}
		else{
			$scope.addQuestionDisabled = true;	
		}
	};
	
	$scope.addQuestion = function(){
		$scope.addQuestionDisabled = true;
		$scope.quiz.questions.push({answers:[{correct:false},{correct:false}]});
	};
		
	$scope.deleteQuestion=function(index){
		$scope.quiz.questions.splice(index,1);
	};

	$scope.validateQuiz = function(){
		var questions = $scope.quiz.questions;
		$scope.quiz.invalid = false;
		for(var i = 0; i < questions.length;i++){
			$scope.validateQuestion(questions[i]);
			if(questions[i].invalid){
				$scope.quiz.invalid = true;
			};
		};

	};

	$scope.validateQuestion = function(question){
		var answers = question.answers;
		question.invalid = true;
		for(var i = 0; i < answers.length;i++){
			
			if (answers[i].correct) {
				question.invalid =  false;
			};
		};
		
	};


	/** Redirect to result-page if quiz is valid  */
	$scope.saveQuiz = function(){
		$scope.validateQuiz();
		if(!$scope.quiz.invalid){
			$scope.quiz.state = 1;
			QuizData.save($scope.quiz);
		};
	};

	$scope.sendForReview = function(){
		$scope.validateQuiz();
		if(!$scope.quiz.invalid){
			$scope.quiz.state = 2;
			QuizData.save($scope.quiz);
		};
	};

	$scope.init();

}]);

