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

/** Quiz Edit controller  */
yunakQuizApp.controller('QuizEditCtrl', ['$scope','QuizData', '$routeParams','tags', '$location', function($scope, QuizData, $routeParams, tags, $location) {

	/** MOCK - get categories and subCats object */
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

	/** get Quiz by ID */
	QuizData.get($routeParams.quiz_id)
		.success(function(data, status, headers, config){
			$scope.quiz = data;
			$scope.setSubcat();
		})
		.error(function(data){
			$location.path('/404/');
		});
	
	/** get all tags from backend*/
	$scope.loadTags = function(query) {
	    return tags.load();
	};

	/** set parent category according selected subCat*/
	$scope.setCat = function(){
		for (var i=0; i < $scope.cats.length; i++){		
			if ($scope.cats[i].id == $scope.selectedSubcat.category_id){
				$scope.selectedCat = $scope.cats[i];
			};
		};
	};

	/** set selected subCat to be equal subcat in Quiz */
	$scope.setSubcat  = function() {
		for (var i=0; i < $scope.subcats.length; i++){		
			if ($scope.subcats[i].id == $scope.quiz.category_id){
				$scope.selectedSubcat = $scope.subcats[i] ;
				$scope.setCat();
			};
		};
	};

	/** add empty answer*/
	$scope.addAnswer = function(question) {
		question.answers.push({correct:false});
	};

	/** mark answer to delete in backend */
	$scope.deleteAnswer = function(answer) {
		answer.toDelete = true;
	}

	/** set that this answer to be correct/incorrect */
	$scope.setCorrectAnswer=function(question,answer){
		question.invalid = false;
		answer.correct = !answer.correct;
	};

	/** check all questions to be valid */
	$scope.validateQuiz = function(){
		var questions = $scope.quiz.questions;
		$scope.quiz.invalid = false;
		for(var i = 0; i < questions.length;i++){
			if(!questions[i].toDelete){
				$scope.validateQuestion(questions[i]);
				if(questions[i].invalid){
					$scope.quiz.invalid = true;
				};
			};
		};
	};

	/** check question to be valid */
	$scope.validateQuestion = function(question){
		var answers = question.answers;
		question.invalid = true;
		for(var i = 0; i < answers.length;i++){
			
			if (answers[i].correct && !answers[i].toDelete) {
				question.invalid =  false;
			};
		};
	};

	/** add empty question */
	$scope.addQuestion = function(){
		$scope.addQuestionDisabled = true;
		$scope.quiz.questions.push({answers:[{correct:false},{correct:false}]});
	};
		
	/** delete question or mark to delete it on backend */	
	$scope.deleteQuestion = function(question,index){
		if(question.id){
			question.toDelete = true;
		}
		else{
			$scope.quiz.questions.splice(index,1);
		}
	};

	/** show status message */
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

	/** save draft Quiz */
	$scope.saveQuiz=function(){
		$scope.sendQuiz(1);
	};

	/** save Quiz for review */
	$scope.reviewQuiz=function(){
		$scope.sendQuiz(2);
	};

	/** send Quiz to backend  */
	$scope.sendQuiz = function(state){
		$scope.quiz.category_id = $scope.selectedSubcat.id;
		$scope.validateQuiz();
		if(!$scope.quiz.invalid){
			$scope.quiz.state = state;
			
			QuizData.save($scope.quiz)
				.success(function(data, status, headers, config) {
					if(state==1){
						$scope.showMessage('Ваш тест збережено','alert-success');
					}
					else {
						$scope.showMessage('Ваш тест відправлено на модерацію','alert-warning');
					};
				})
	            .error( function(data, status, headers, config) { 
					$scope.showMessage('Ваш тест не збережено','alert-danger');
	            });
		};
	};

}]);

/** Quiz Create controller  */
yunakQuizApp.controller('QuizCreateCtrl', ['$scope','QuizData','tags', '$location', function($scope, QuizData,tags, $location) {

	/** MOCK - get categories and subCats object */
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
	 $scope.loadTags = function(query) {
	    return tags.load();
	};

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

	$scope.saveQuiz=function(){
		$scope.sendQuiz(1);
	};

	$scope.reviewQuiz=function(){
		$scope.sendQuiz(2);
	};

	/** show status message */
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
	$scope.sendQuiz = function(state){
		$scope.quiz.category_id = $scope.selectedSubcat.id;
		$scope.validateQuiz();
		if(!$scope.quiz.invalid){
			$scope.quiz.state = state;
			
			QuizData.save($scope.quiz)
				.success(function(data, status, headers, config) {
					if(state==1){
						$scope.showMessage('Ваш тест збережено','alert-success');
					}
					else {
						$scope.showMessage('Ваш тест відправлено на модерацію','alert-warning');
					};
				})
	            .error( function(data, status, headers, config) { 
					$scope.showMessage('Ваш тест не збережено','alert-danger');
	            });
		};
	};

	$scope.init();

}]);

