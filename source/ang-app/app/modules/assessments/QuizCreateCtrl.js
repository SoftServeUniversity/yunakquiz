'use strict';
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
		$scope.sendQuiz("draft");
	};

	$scope.reviewQuiz=function(){
		$scope.sendQuiz("review");
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
			$scope.quiz.status = state;
			
			QuizData.create($scope.quiz)
				.success(function(data, status, headers, config) {
					if(state=="draft"){
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
