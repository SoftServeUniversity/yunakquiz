'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('e2e test for quiz creation page', function() {
	
	var ptor =  protractor.getInstance();
 	var mockModule = require('../http_backend_quiz.js');
 	// ptor.addMockModule('httpBackendMock', mockModule.httpBackendMock);
	
	beforeEach(function() {
    	ptor.addMockModule('httpBackendMock', mockModule.httpBackendMock);  
 	});


	describe('quiz titles', function() {
		beforeEach(function() {
			browser.get('/#/admin/assessments/create');
		});
	    it('should render title of page', function() {
	    	element(by.css('.quiz .assessment-title')).getText().then(function(title) {
			expect(title).toBe('Створення нового тесту');
			});
	    });

	    it('should render input fot title enter', function() {
	    	expect(element(by.model('quiz.title')).isPresent()).toBe(true);
	    });

	    it('should render input fot description enter', function() {
	    	expect(element(by.model('quiz.description')).isPresent()).toBe(true);
	    });

	    it('should render input fot tags enter', function() {
	    	expect(element(by.model('quiz.tags')).isPresent()).toBe(true);
	    });

	    it('should render select for quiz category', function() {
	    	expect(element(by.model('selectedCat')).isPresent()).toBe(true);
	    });

	    it('should render select field for quiz subcategory', function() {
	    	expect(element(by.model('selectedSubcat')).isPresent()).toBe(true);
	    });

	    it('should render select field for quiz subcategory', function() {
		     expect(element(by.model('selectedCat')).$('option:checked').getText()).toEqual('Оберіть категорію');
	    });

	    it('should render select field for quiz subcategory', function() {
	    	expect(element(by.model('selectedSubcat')).$('option:checked').getText()).toBe('Оберіть Підкатегорію');
	    });

	});

	describe('quiz body', function() {

		beforeEach(function() {
			browser.get('http://localhost:8000/#/admin/assessments/create');
		});

	    it('should render one quiestion block', function() {
	    	expect(element.all(by.repeater('question in quiz.questions')).count()).toBe(1);
	    });

	    it('should render two answer field in question block', function() {
	    	expect(element.all(by.repeater('answer in question.answers')).count()).toBe(2);
	    });

	    it('should not find delete answer button', function() {
	    	expect(element.all(by.repeater('answer in question.answers'))
	    	.get(1).element(by.css('.quizDeleteAnswer')).isPresent()).toBe(false);
	    });

	    it('should create third answer field', function() {
	    	element(by.buttonText('Додати відповідь')).click();
			expect(element.all(by.repeater('answer in question.answers')).count()).toBe(3);
		});

		it('should mark third answer as correct', function() {
			element(by.buttonText('Додати відповідь')).click();
	    	element.all(by.repeater('answer in question.answers')).get(2).element(by.css('.markCorrectAnswerBtn')).click();
			expect(element(by.css('.quizCorrectAnswer')).isPresent()).toBe(true);
		});	

	    it('should delete third answer field', function() {
	    	element(by.buttonText('Додати відповідь')).click();
	    	element.all(by.repeater('answer in question.answers')).get(2).element(by.css('.quizDeleteAnswer')).click();
	        expect(element.all(by.repeater('answer in question.answers')).count()).toBe(2);	    	
	    });

	    it('should not find to delete question button', function() {
	    	expect(element.all(by.repeater('question in quiz.questions'))
	    	.get(0).element(by.css('.closeButton')).isPresent()).toBe(false);
	    });

	    it('should create second question block', function() {
	    	element(by.buttonText('Додати питання')).click();
			expect(element.all(by.repeater('question in quiz.questions')).count()).toBe(2);
	    });

	    it('should delete second question block', function() {
	    	element(by.buttonText('Додати питання')).click();
	    	element.all(by.repeater('question in quiz.questions')).get(1).element(by.css('.closeButton')).click();
	        expect(element.all(by.repeater('question in quiz.questions')).count()).toBe(1);
	    });

	    it('should render disabled attr on save quiz button', function() {
	    	expect(element(by.buttonText('Зберегти чорновик'))
	    		.getAttribute('disabled').isPresent()).toBe(true);
	    });

	    it('should render disabled attr on send quiz button', function() {
	    	expect(element(by.buttonText('Відправити на модерацію'))
	    		.getAttribute('disabled').isPresent()).toBe(true);
	    });

	});

	describe('fill fields', function() {
		var questions;
		var answers;
		var addAnswer;
		var addQuestion;

		beforeEach(function() {
			browser.get('http://localhost:8000/#/admin/assessments/create');
			questions = element.all(by.repeater('question in quiz.questions'));
			addQuestion = element(by.buttonText('Додати питання'));

			element(by.model('quiz.title')).sendKeys('Тест на знання правил футболу');
			element(by.model('quiz.description')).sendKeys('Детальний опис тесту');
			element(by.cssContainingText('option', 'Спорт')).click();
			element(by.cssContainingText('option', 'Футбол')).click();
			
			answers = questions.get(0).all(by.repeater('answer in question.answers'));
			addAnswer = questions.get(0).element(by.buttonText('Додати відповідь'));
			questions.get(0).element(by.model('question.title')).sendKeys('Скільки гравців в команді?');
			questions.get(0).element(by.model('question.description')).sendKeys('опис до першого питання');
			answers.get(0).element(by.model('answer.title')).sendKeys('11');
			answers.get(1).element(by.model('answer.title')).sendKeys('12');
			addAnswer.click();
			answers.get(2).element(by.model('answer.title')).sendKeys('5');
			addAnswer.click();
			answers.get(3).element(by.model('answer.title')).sendKeys('22');
			addQuestion.click();
			
			answers = questions.get(1).all(by.repeater('answer in question.answers'));
			addAnswer = questions.get(1).element(by.buttonText('Додати відповідь'));
			questions.get(1).element(by.model('question.title')).sendKeys('Скільки триває один тайм?');
			questions.get(1).element(by.model('question.description')).sendKeys('опис до другого питання');
			answers.get(0).element(by.model('answer.title')).sendKeys('20хв');
			answers.get(1).element(by.model('answer.title')).sendKeys('45хв');
			addAnswer.click();
			answers.get(2).element(by.model('answer.title')).sendKeys('до останнього гравця');
			addQuestion.click();
			
			answers = questions.get(2).all(by.repeater('answer in question.answers'));
			addAnswer = questions.get(2).element(by.buttonText('Додати відповідь'));
			questions.get(2).element(by.model('question.title')).sendKeys('Що відбудеться, коли гравець торкнеться м’яча рукою?');
			questions.get(2).element(by.model('question.description')).sendKeys('опис до третьго питання');
			answers.get(0).element(by.model('answer.title')).sendKeys('Порушенння правил');
			answers.get(1).element(by.model('answer.title')).sendKeys('Штрафний удар');
			addAnswer.click();
			answers.get(2).element(by.model('answer.title')).sendKeys('Дадуть пиріжок');
			addAnswer.click();
			answers.get(3).element(by.model('answer.title')).sendKeys('Дадуть в голову');
		});

	    it('should render the tip to mark the correct answer', function() {
	    	element(by.buttonText('Зберегти чорновик')).click();
	    	expect(element.all(by.css('[ng-show="question.invalid"]')).count()).toBe(3);
	    });

	    it('should mark the correct answer in first question', function() {
	    	questions = element.all(by.repeater('question in quiz.questions'));

	    	questions.get(0).all(by.repeater('answer in question.answers'))
	    	.get(0).element(by.css('.markCorrectAnswerBtn')).click();
	    	questions.get(1).all(by.repeater('answer in question.answers'))
	    	.get(1).element(by.css('.markCorrectAnswerBtn')).click();
	    	questions.get(2).all(by.repeater('answer in question.answers'))
	    	.get(0).element(by.css('.markCorrectAnswerBtn')).click();
	    	questions.get(2).all(by.repeater('answer in question.answers'))
	    	.get(1).element(by.css('.markCorrectAnswerBtn')).click();

	    	element(by.buttonText('Зберегти чорновик')).click();
	    	expect(browser.getCurrentUrl()).toEqual("http://localhost:8000/#/admin/personalCabinet/draft")
	    });

	    it('should mark the correct answer in second question', function() {
	    	questions = element.all(by.repeater('question in quiz.questions'));

	    	questions.get(0).all(by.repeater('answer in question.answers'))
	    	.get(0).element(by.css('.markCorrectAnswerBtn')).click();
	    	questions.get(1).all(by.repeater('answer in question.answers'))
	    	.get(1).element(by.css('.markCorrectAnswerBtn')).click();
	    	questions.get(2).all(by.repeater('answer in question.answers'))
	    	.get(0).element(by.css('.markCorrectAnswerBtn')).click();
	    	questions.get(2).all(by.repeater('answer in question.answers'))
	    	.get(1).element(by.css('.markCorrectAnswerBtn')).click();

	    	element(by.buttonText('Відправити на модерацію')).click().then(function(){
	    		expect(browser.getCurrentUrl()).toEqual("http://localhost:8000/#/admin/personalCabinet/review");
	    	});

	    	

	    });

	});

});