'use strict';

describe('faq page', function(){

	var ptor =  protractor.getInstance();
 	var mockModule = require('./faqAdminPageBackend.js');

 	var questions = [
		{"id": 1, "faq_question": "Як створити свій тест?", "faq_answer": "Для цього потрібно зареєструватись"},
		{"id": 2, "faq_question": "Де можна знайти інформацію про сайт?", "faq_answer": "В нижньому меню, яке називається Про Нас"},
		{"id": 3, "faq_question": "За якою шкалою оцінюється пройдений тест?", "faq_answer": "100% - всі відповіді вірні, 67% - 2 відповіді з 3 правильні, 33% - 1 лише відповідь првильна, 0% - всі відповіді не правильні"},
		{"id": 4, "faq_question": "Де можна знайти тест на знання правил хокею?", "faq_answer": "В підкатегорії Хокей, яка знаходиться в категорії Спорт"},
		{"id": 5, "faq_question": "Чи можна для пошук вибрати якусь конкретну підкатегорію?", "faq_answer": "Так, звичайно."},
		{"id": 6, "faq_question": "питання 6", "faq_answer": "відповідь 6"}
	];

	var faqTitle = "Часті Питання На Правах Адміна";

	beforeEach(function() {
    	ptor.addMockModule('httpBackendMock', mockModule.httpBackendMock);  
 	});

// testing FAQ page

	describe('faq page', function(){

		beforeEach(function(){
			browser.get('http://localhost:8000/#/faq_admin');
		});

	    it('should see faq page title', function(){
	   		expect(element(by.css('h3.pageTitle')).getText()).toMatch(faqTitle);
	   	});

	   	it('should all questions and answers on the page', function(){
	   		expect(element.all(by.repeater('Question in Questions')).count()).toEqual(6);
	   	});

	   	it('should see all question and answer', function(){
	   		var allQuestion = element.all(by.repeater('Question in Questions'));
	   		expect(allQuestion.get(0).getText()).toMatch(questions[0].faq_question);
	   		expect(allQuestion.get(0).getText()).toMatch(questions[0].faq_answer);
	   		   
	   		expect(allQuestion.get(1).getText()).toMatch(questions[1].faq_question);
	   		expect(allQuestion.get(1).getText()).toMatch(questions[1].faq_answer);
	   	  
	   		expect(allQuestion.get(2).getText()).toMatch(questions[2].faq_question);
	   		expect(allQuestion.get(2).getText()).toMatch(questions[2].faq_answer);
	   	   
	   		expect(allQuestion.get(3).getText()).toMatch(questions[3].faq_question);
	   		expect(allQuestion.get(3).getText()).toMatch(questions[3].faq_answer);
	   		   	
	   		expect(allQuestion.get(4).getText()).toMatch(questions[4].faq_question);
	   		expect(allQuestion.get(4).getText()).toMatch(questions[4].faq_answer);
	   	
	   		expect(allQuestion.get(5).getText()).toMatch(questions[5].faq_question);
	   		expect(allQuestion.get(5).getText()).toMatch(questions[5].faq_answer);
	   	});

	   	it('click on Edit Button and Save Button', function(){
	   		var editButton = element.all(by.css('button.btn.btn-primary'));
	   		editButton.get(11).click();
	   		var inputQuestion = element(by.css('input'));
	   		inputQuestion.clear();
	   		inputQuestion.sendKeys('нове питання 6');
	   		var inputAnswer = element(by.css('textarea'));
	   		inputAnswer.clear();
	   		inputAnswer.sendKeys('нова відповідь 6');
	   		var saveButton = element.all(by.buttonText('Save'));
	   		saveButton.get(5).click();
	   	});

	   	it('click on Add Button', function(){
	   		var addButton = element(by.buttonText('Add Question'));
	   		addButton.click();
	   		var inputQuestion = element(by.css('input'));
	   		inputQuestion.sendKeys('питання 7');
	   		var inputAnswer = element(by.css('textarea'));
	   		inputAnswer.sendKeys('відповідь 7');
	   		var saveButton = element.all(by.buttonText('Save'));
	   		saveButton.get(6).click();
	   	});

	   	it('click on Delete Button', function(){
	   		var deleteButton = element.all(by.buttonText('Del'));
	   		deleteButton.get(5).click();
	   		expect(element.all(by.repeater('Question in Questions')).count()).toEqual(6);
	   	});
	});

});
