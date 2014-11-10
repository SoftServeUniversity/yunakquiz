'use strict';

describe('faq page', function(){

	var ptor =  protractor.getInstance();
 	var mockModule = require('./faqPageBackend.js');

 	var questions = [
		{"id": 1, "faq_question": "Як створити свій тест?", "faq_answer": "Для цього потрібно зареєструватись"},
		{"id": 2, "faq_question": "Де можна знайти інформацію про сайт?", "faq_answer": "В нижньому меню, яке називається Про Нас"},
		{"id": 3, "faq_question": "За якою шкалою оцінюється пройдений тест?", "faq_answer": "100% - всі відповіді вірні, 67% - 2 відповіді з 3 правильні, 33% - 1 лише відповідь првильна, 0% - всі відповіді не правильні"},
		{"id": 4, "faq_question": "Де можна знайти тест на знання правил хокею?", "faq_answer": "В підкатегорії Хокей, яка знаходиться в категорії Спорт"},
		{"id": 5, "faq_question": "Чи можна для пошук вибрати якусь конкретну підкатегорію?", "faq_answer": "Так, звичайно."}
	];

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
	   		expect(element.all(by.repeater('Question in Questions')).count()).toEqual(5);
	   	});

	   	// should see 1 question and 1 answer

	   	it('should see first question', function(){
	   		var firstQuestion = element.all(by.repeater('Question in Questions'));
	   		expect(firstQuestion.get(0).getText()).toMatch(questions[0].faq_question);
	   	});

	   	it('click on first question', function(){
	   		var firstQuestion = element.all(by.repeater('Question in Questions'));
	   		firstQuestion.get(0).click();
	   		var firstAnswer = element(by.css('p#Question1'));
	   		expect(firstAnswer.getText()).toMatch(questions[0].faq_answer);
	   		firstQuestion.get(0).click();
	   	});

	   	// should see 2 question and 2 answer

	   	it('should see second question', function(){
	   		var secondQuestion = element.all(by.repeater('Question in Questions'));
	   		expect(secondQuestion.get(1).getText()).toMatch(questions[1].faq_question);
	   	});

	   	it('click on second question', function(){
	   		var secondQuestion = element.all(by.repeater('Question in Questions'));
	   		secondQuestion.get(1).click();
	   		var secondAnswer = element(by.css('p#Question2'));
	   		expect(secondAnswer.getText()).toMatch(questions[1].faq_answer);
	   		secondQuestion.get(1).click();
	   	});

	   	// should see 3 question and 3 answer

	   	it('should see third question', function(){
	   		var thirdQuestion = element.all(by.repeater('Question in Questions'));
	   		expect(thirdQuestion.get(2).getText()).toMatch(questions[2].faq_question);
	   	});

	   	it('click on third question', function(){
	   		var thirdQuestion = element.all(by.repeater('Question in Questions'));
	   		thirdQuestion.get(2).click();
	   		var thirdAnswer = element(by.css('p#Question3'));
	   		expect(thirdQuestion.getText()).toMatch(questions[2].faq_answer);
	   		thirdQuestion.get(2).click();
	   	});

	   	// should see 4 question and 4 answer

	   	it('should see fourth question', function(){
	   		var fourthQuestion = element.all(by.repeater('Question in Questions'));
	   		expect(fourthQuestion.get(3).getText()).toMatch(questions[3].faq_question);
	   	});

	   	it('click on fourth question', function(){
	   		var fourthQuestion = element.all(by.repeater('Question in Questions'));
	   		fourthQuestion.get(3).click();
	   		var fourthAnswer = element(by.css('p#Question4'));
	   		expect(fourthQuestion.getText()).toMatch(questions[3].faq_answer);
	   		fourthQuestion.get(3).click();
	   	});

	   	// should see 5 question and 5 answer

	   	it('should see fifth question', function(){
	   		var fifthQuestion = element.all(by.repeater('Question in Questions'));
	   		expect(fifthQuestion.get(4).getText()).toMatch(questions[4].faq_question);
	   	});

	   	it('click on fifth question', function(){
	   		var fifthQuestion = element.all(by.repeater('Question in Questions'));
	   		fifthQuestion.get(4).click();
	   		var fifthAnswer = element(by.css('p#Question5'));
	   		expect(fifthQuestion.getText()).toMatch(questions[4].faq_answer);
	   		fifthQuestion.get(4).click();
	   	});

	});

});
