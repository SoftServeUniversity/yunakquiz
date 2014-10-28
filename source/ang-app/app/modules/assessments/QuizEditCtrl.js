'use strict';
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
			$scope.getComments(data['id']);
		})
		.error(function(data){
			$location.path('/404/');
		});

	$scope.getComments = function(quiz_id) {
		QuizData.getComments(quiz_id)
			.success(function(data, status, headers, config){
				$scope.comments = data;
			});
	};
			
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
		$scope.sendQuiz("draft");
	};

	/** save Quiz for review */
	$scope.reviewQuiz=function(){
		$scope.sendQuiz("review");
	};

	/** send Quiz to backend  */
	$scope.sendQuiz = function(state){
		$scope.quiz.category_id = $scope.selectedSubcat.id;
		$scope.validateQuiz();
		if(!$scope.quiz.invalid){
			$scope.quiz.status = state;
			
			QuizData.update($scope.quiz)
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

}]);
