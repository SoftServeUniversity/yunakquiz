'use strict';

describe('faq page', function(){

	var ptor =  protractor.getInstance();
 	var mockModule = require('../faqAdminPageBackend.js');

 	var questions = [
		{"id": 1, "faq_question": "Як створити свій тест?", "faq_answer": "Для цього потрібно зареєструватись"},
		{"id": 2, "faq_question": "Де можна знайти інформацію про сайт?", "faq_answer": "В нижньому меню, яке називається Про Нас"},
		{"id": 3, "faq_question": "За якою шкалою оцінюється пройдений тест?", "faq_answer": "100% - всі відповіді вірні, 67% - 2 відповіді з 3 правильні, 33% - 1 лише відповідь првильна, 0% - всі відповіді не правильні"},
		{"id": 4, "faq_question": "Де можна знайти тест на знання правил хокею?", "faq_answer": "В підкатегорії Хокей, яка знаходиться в категорії Спорт"},
		{"id": 5, "faq_question": "Чи можна для пошук вибрати якусь конкретну підкатегорію?", "faq_answer": "Так, звичайно."}
	];
	var tabPosition = 6;
	var allQuestions = 5;
	var generalTitle = "Адміністративна панель";
	var faqTabTitle = "Часті запитання";

	beforeEach(function() {
    	ptor.addMockModule('httpBackendMock', mockModule.httpBackendMock);  
 	});	 		
		
 	// testing FAQ page for Administration panel

	describe('faq page', function(){

		beforeEach(function(){
			browser.get('http://localhost:8000/#/administration-panel/faqTab');
		});

	    it('should see page title', function(){
	   		expect(element(by.css('h3.pageTitle')).getText()).toMatch(generalTitle);
	   	});

	   	it('should see faq page title', function(){
	   		var faqTabT = element.all(by.css('section li a'));
	   		expect(faqTabT.get(tabPosition).getText()).toMatch(faqTabTitle);
	   	});

	   	it('should all questions and answers on the page', function(){
	   		expect(element.all(by.repeater('Question in Questions')).count()).toEqual(allQuestions);
	   	});
	   	
	   	it('should see all question and answer', function(){
	   		for(var i = 0; i < questions.length; i++){
	   			var allQ = element.all(by.repeater('Question in Questions'));
	   			expect(allQ.get(i).getText()).toMatch(questions[i].faq_question);
		   		expect(allQ.get(i).getText()).toMatch(questions[i].faq_answer);
		   	};
	   	});		

	   	it('click on Edit Button and Save Button', function(){
	   		var editButton = element.all(by.buttonText('Редагувати'));
	   		editButton.get(4).click();
	   		var inputQuestion = element(by.css('input.editable-input'));
	   		inputQuestion.clear();
	   		inputQuestion.sendKeys('нове питання 5');
	   		var inputAnswer = element(by.css('textarea.editable-input'));
	   		inputAnswer.clear();
	   		inputAnswer.sendKeys('нова відповідь 5');
	   		var saveButton = element.all(by.buttonText('Зберегти'));
	   		saveButton.get(4).click();
	   	});

	   	it('click on Add Button', function(){
	   		var addButton = element(by.buttonText('Додати питання'));
	   		addButton.click();
	   		var inputQuestion = element(by.css('input.editable-input'));
	   		inputQuestion.sendKeys('питання 6');
	   		var inputAnswer = element(by.css('textarea.editable-input'));
	   		inputAnswer.sendKeys('відповідь 6');
	   		var saveButton = element.all(by.buttonText('Зберегти'));
	   		saveButton.get(5).click();
	   	});
	});
});