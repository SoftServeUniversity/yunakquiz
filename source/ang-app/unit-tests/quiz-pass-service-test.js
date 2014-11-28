'use strict';
describe("QuizPassService", function() {
	beforeEach(module('ngRoute'));
	beforeEach(module('yunakQuiz.assessments'));
	var  quiz, question, answer, QuizPassService;
		    	beforeEach(inject(function(_QuizPassService_) {
		        	quiz = {"id":"1","title":"Тест на знання правил футболу","category_id":2,"description":"Детальний опис тесту","questions":[{"id":1,"quiz_id":1,"title":"Скільки гравців в команді?","description":"Пояснення: Згідно правил на полі знаходиться 11 гравців однієї команди","created_at":"2014-10-13T21:41:36.547Z","updated_at":"2014-10-13T21:41:36.547Z","answers":[{"id":1,"question_id":1,"title":"11","correct":true},{"id":2,"question_id":1,"title":"12","correct":false},{"id":3,"question_id":1,"title":"5","correct":false}]},{"id":2,"quiz_id":1,"title":"Скільки триває один тайм?","description":"demo","created_at":"2014-10-13T21:41:36.570Z","updated_at":"2014-10-13T21:41:36.570Z","answers":[{"id":4,"question_id":2,"title":"20хв","correct":false},{"id":5,"question_id":2,"title":"45хв","correct":true},{"id":6,"question_id":2,"title":"до останнього гравця","correct":false}]},{"id":3,"quiz_id":1,"title":"Що відбудеться, коли гравець торкнеться м’яча рукою?","description":"demo","created_at":"2014-10-13T21:41:36.603Z","updated_at":"2014-10-13T21:41:36.603Z","answers":[{"id":7,"question_id":3,"title":"Порушенння правил","correct":true},{"id":8,"question_id":3,"title":"Штрафний удар","correct":true},{"id":9,"question_id":3,"title":"Дадуть пиріжок","correct":false},{"id":10,"question_id":3,"title":"Дадуть в голову","correct":false}]}]}
					question = quiz.questions[0];
					answer = question.answers[0];
					QuizPassService = _QuizPassService_
	        	}));
	       	
	it("should behave...", function(){
		
		expect(QuizPassService.getQuiz).toBeDefined();
		//expect(QuizPassService.postResult).toBeDefined();
		expect(QuizPassService.validateQuiz).toBeDefined();
		expect(QuizPassService.validateQuestion).toBeDefined();
		//expect(QuizPassService.checkQuestions).toBeDefined();
		//expect(QuizPassService.checkAnswers).toBeDefined();
		//expect(QuizPassService.countCorrectAnswers).toBeDefined();
		expect(QuizPassService.submitQuiz).toBeDefined();

	});

	it("getQuiz function should make $http request", inject(function($httpBackend){
		$httpBackend.expectGET('http://localhost:9292/assessments/1').respond(200);
		QuizPassService.getQuiz(1);
		$httpBackend.flush();
	}));

	it("validateQuestion function should validate question if it has picked answers", function(){
		QuizPassService.validateQuestion(question);
		expect(question.invalid).toBeTruthy();
		answer.checked = true;
		QuizPassService.validateQuestion(question);
		expect(question.invalid).toBeFalsy();
	});	
});