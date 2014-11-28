'use strict'
describe("Name of the group", function() {
	

describe('QuizShowCtrl', function (){
	beforeEach(module('ngRoute'));
	beforeEach(module('yunakQuiz.assessments'));
	var scope, QuizShowCtrl, QuizPassService, quiz, question, answer;
	beforeEach(inject(function($controller, $rootScope, _QuizPassService_) {
	scope = $rootScope.$new();	
	QuizShowCtrl = $controller('QuizShowCtrl', {$scope:scope});
	QuizPassService = _QuizPassService_;
	quiz = {"id":"1","title":"Тест на знання правил футболу","category_id":2,"description":"Детальний опис тесту","questions":[{"id":1,"quiz_id":1,"title":"Скільки гравців в команді?","description":"Пояснення: Згідно правил на полі знаходиться 11 гравців однієї команди","created_at":"2014-10-13T21:41:36.547Z","updated_at":"2014-10-13T21:41:36.547Z","answers":[{"id":1,"question_id":1,"title":"11","correct":true},{"id":2,"question_id":1,"title":"12","correct":false},{"id":3,"question_id":1,"title":"5","correct":false}]},{"id":2,"quiz_id":1,"title":"Скільки триває один тайм?","description":"demo","created_at":"2014-10-13T21:41:36.570Z","updated_at":"2014-10-13T21:41:36.570Z","answers":[{"id":4,"question_id":2,"title":"20хв","correct":false},{"id":5,"question_id":2,"title":"45хв","correct":true},{"id":6,"question_id":2,"title":"до останнього гравця","correct":false}]},{"id":3,"quiz_id":1,"title":"Що відбудеться, коли гравець торкнеться м’яча рукою?","description":"demo","created_at":"2014-10-13T21:41:36.603Z","updated_at":"2014-10-13T21:41:36.603Z","answers":[{"id":7,"question_id":3,"title":"Порушенння правил","correct":true},{"id":8,"question_id":3,"title":"Штрафний удар","correct":true},{"id":9,"question_id":3,"title":"Дадуть пиріжок","correct":false},{"id":10,"question_id":3,"title":"Дадуть в голову","correct":false}]}]} 
	question = quiz.questions[0];
    answer = question.answers[0];
}));

	it('scope should be set properly ', function(){
        expect(QuizShowCtrl).toBeDefined();
        expect(scope.checkAnswer).toBeDefined();
        expect(scope.passQuiz).toBeDefined();
        expect(QuizPassService.submitQuiz).toBeDefined();
    });

	it("checkAnswer() should select answer, and call question validation function", function(){
	    spyOn(QuizPassService, "validateQuestion").andCallFake(function (question){
			question.invalid = !question.answers.some(function(answer){ return answer.checked })
			return question.invalid
  		});
	    expect(answer.checked).toBeFalsy();
	    scope.checkAnswer(answer, question);
	    expect(answer.checked).toBeTruthy();
	    expect(QuizPassService.validateQuestion).toHaveBeenCalledWith(question);
	});
});
});