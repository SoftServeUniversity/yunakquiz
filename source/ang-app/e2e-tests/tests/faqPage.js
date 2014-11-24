'use strict';

describe('faq page', function(){

	var ptor =  protractor.getInstance();
 	var mockModule = require('../faqPageBackend.js');

 	var questions = [
		{"id": 1, "faq_question": "Як створити свій тест?", "faq_answer": "Для цього потрібно зареєструватись"},
		{"id": 2, "faq_question": "Де можна знайти інформацію про сайт?", "faq_answer": "В нижньому меню, яке називається Про Нас"},
		{"id": 3, "faq_question": "За якою шкалою оцінюється пройдений тест?", "faq_answer": "100% - всі відповіді вірні, 67% - 2 відповіді з 3 правильні, 33% - 1 лише відповідь првильна, 0% - всі відповіді не правильні"},
		{"id": 4, "faq_question": "Де можна знайти тест на знання правил хокею?", "faq_answer": "В підкатегорії Хокей, яка знаходиться в категорії Спорт"},
		{"id": 5, "faq_question": "Чи можна для пошук вибрати якусь конкретну підкатегорію?", "faq_answer": "Так, звичайно."}
	];
	var questionsLength = 5;
	var answerArray = ['p#Question1', 'p#Question2', 'p#Question3', 'p#Question4', 'p#Question5'];
	var faqTitle = "Часті Питання";

	beforeEach(function() {
    	ptor.addMockModule('httpBackendMock', mockModule.httpBackendMock);  
 	});

// testing FAQ page

	describe('faq page', function(){

		beforeEach(function(){
			browser.get('http://localhost:8000/#/faq');
		});

	    it('should see faq page title', function(){
	   		expect(element(by.css('h3.pageTitle')).getText()).toMatch(faqTitle);
	   	});

	   	it('should all questions on the page', function(){
	   		expect(element.all(by.repeater('Question in Questions')).count()).toEqual(questionsLength);
	   	});

	   	// should see all questions and answers	   	

		it('should see current question', function(){
			for(var i = 0; i < questionsLength; i++){
		  		var curQuestion = element.all(by.repeater('Question in Questions'));
		   		expect(curQuestion.get(i).getText()).toMatch(questions[i].faq_question);
		   	
		   		curQuestion.get(i).click();
		   		var curAnswer = element(by.css(answerArray[i]));
		   		expect(curAnswer.getText()).toMatch(questions[i].faq_answer);
		   		curQuestion.get(i).click();
			};
	   	});
	});
});