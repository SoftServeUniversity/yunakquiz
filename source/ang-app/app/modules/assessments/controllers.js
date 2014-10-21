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
	$scope.checkQuiz = function (quiz){
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

	/** check questions and count score if we have quiz object  */
	if ($scope.assessment.questions){
		checkQuestions();
		$scope.counter = $scope.correctAnswerCounter();
	}	
	else {
		$scope.redirectToAssessment();
	};

	/** Check all questions in quiz */
	$scope.checkQuestions = function (){
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

}]);

/** Quiz Edit controller  */
yunakQuizApp.controller('QuizEditCtrl', ['$scope','QuizData', '$routeParams', function($scope, QuizData, $routeParams) {

	/** get quiz object */
	$scope.subcats =[
		{id:2,category_id:1,title:"Футбол"},
		{id:3,category_id:1,title:"Хокей"},
		{id:5,category_id:4,title:"Історія України"},
		{id:6,category_id:4,title:"Історія світу"}
	];

	$scope.cats =[
		{id:1,category_id:0,title:"Спорт"},
		{id:4,category_id:0,title:"Історія"}
	];

	QuizData.get($routeParams.quiz_id, function(data){
	    $scope.quiz = data; 
	    $scope.setSubcat();	
	   });

	$scope.setCat = function(){
		for (var i=0; i < $scope.cats.length; i++){		
			if ($scope.cats[i].id == $scope.selectedSubcat.category_id){
				$scope.selectedCat = $scope.cats[i];
			};
		};
	};

	$scope.setSubcat  = function() {
		for (var i=0; i < $scope.subcats.length; i++){		
			if ($scope.subcats[i].id == $scope.quiz.category_id){
				$scope.selectedSubcat = $scope.subcats[i] ;
				$scope.setCat();
			};
		};
	};

	$scope.addAnswer = function(question) {
		question.answers.push({correct:false});
	};

	$scope.deleteAnswer = function(answer) {
		answer.toDelete = true;
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
			
			if (answers[i].correct && !answers[i].toDelete ) {
				question.invalid =  false;
			};
		};
	};

	$scope.addQuestion = function(){
		$scope.addQuestionDisabled = true;
		$scope.quiz.questions.push({answers:[{correct:false}]});
	};
		
	$scope.deleteQuestion = function(question){
		question.toDelete = true;
	};

	$scope.showMessage = function(message,msgClass){
		window.scrollTo(0,0);
		$scope.sendMessage =message;
		$scope.sendMessageClass = msgClass;
		setTimeout(function () {
        	$scope.$apply(function () {
            	delete $scope.sendMessage;
        	});
    	}, 2000);
	};

	/** Redirect to result-page if quiz is valid  */
	$scope.saveQuiz = function(state){
		$scope.quiz.category_id = $scope.selectedSubcat.id;
		$scope.validateQuiz();
		if(!$scope.quiz.invalid){
			$scope.quiz.state = state;
			QuizData.save($scope.quiz)
			.success(function(data, status, headers, config) {
				$scope.showMessage('Ваш тест збережено','alert-success');
			})
            .error( function(data, status, headers, config) { 
				$scope.showMessage('Ваш тест не збережено','alert-danger');
             });
		};
	};

}]);

/** Quiz Create controller  */
yunakQuizApp.controller('QuizCreateCtrl', ['$scope','QuizData', function($scope, QuizData) {

	$scope.categories =[
	{id:1,category_id:0,title:"Спорт"},
	{id:4,category_id:0,title:"Історія"}
	];
	$scope.sub1 = [
		{id:2,category_id:1,title:"Футбол"},
		{id:3,category_id:1,title:"Хокей"}
	];
	$scope.sub2 = [
		{id:5,category_id:4,title:"Історія України"},
		{id:6,category_id:4,title:"Історія світу"}
	];

	$scope.getSubcats = function() {
		if($scope.selectedCat.id ==1){
			$scope.subcats = $scope.sub1;
		} else {$scope.subcats = $scope.sub2;}
	};
	$scope.setSubcat=function(){
		$scope.quiz.category_id = $scope.selectedSubcat.id;
	};

	$scope.init = function() {
		
		$scope.quiz = {};
		$scope.quiz.questions = [];
		$scope.addQuestion();

	};

	$scope.addAnswer = function(question) {
		question.answers.push({correct:false});
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
	$scope.saveQuiz = function(state){
		$scope.quiz.category_id = $scope.selectedSubcat.id;
		$scope.validateQuiz();
		if(!$scope.quiz.invalid){
			$scope.quiz.state = state;
			QuizData.save($scope.quiz);
		};
	};

	$scope.init();

}]);

