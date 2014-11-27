'use strict';

describe('quiz', function() {
	var ptor =  protractor.getInstance();
 	var mockModule = require('../http_backend_quiz.js');
 	ptor.addMockModule('httpBackendMock', mockModule.httpBackendMock);

 	describe('interactions with pass quiz page', function() {
		
		beforeEach(function() {
			browser.get('http://localhost:8000/#/assessments/1');
		});

		it('should show pass quiz page heading with current quiz title in it', function() {
			expect(element.all(by.binding('quiz.title')).getText()).
				toMatch('Тест на знання правил футболу');
		});

		it('should redirect to categories page when clicked on category in breadcrumbs', function() {
			var breadcrumbs = element(by.css('.quiz .breadcrumb'));
			expect(breadcrumbs.all(by.css('a')).get(0).getAttribute('href')).
				toMatch('http://localhost:8000/#/parentcat-page/');
		});

		it('should redirect to categories page when clicked on category in breadcrumbs', function() {
			var breadcrumbs = element(by.css('.quiz .breadcrumb'));
			expect(breadcrumbs.all(by.css('a')).get(1).getAttribute('href')).
				toMatch('http://localhost:8000/#/subcategory/');
		});

		it('should show that quiz with three questions', function() {
			expect(element.all(by.repeater('question in quiz.questions')).count()).
				toBe(3);
		});

		it('should show that first question in quiz has three answers', function() {
			var questions = element.all(by.repeater('question in quiz.questions'));
			expect(questions.get(0).all(by.repeater('answer in question.answers')).count()).
				toBe(3);
		});

		it('should show that after submit button validation failed if none answers were chosen ', function() {
			element.all(by.buttonText('Пройти тест')).click();
			expect(browser.getLocationAbsUrl()).
				toMatch('/assessments/1');
		});

		it('should render quiz-result-page if every question has chosen answer', function() {
			var questions = element.all(by.repeater('question in quiz.questions'));
			questions.get(0).all(by.repeater('answer in question.answers')).get(0).click();
			questions.get(1).all(by.repeater('answer in question.answers')).get(1).click();
			questions.get(2).all(by.repeater('answer in question.answers')).get(2).click();
			element.all(by.buttonText('Пройти тест')).click();
			expect(browser.getLocationAbsUrl()).toMatch('/assessments/1/result');
		});

	});

	describe('interaction with quiz result page after passing quiz (2/3 answers correct)', function() {
		
		beforeEach(function() {
			browser.get('http://localhost:8000/#/assessments/1');
			var questions = element.all(by.repeater('question in quiz.questions'));
			questions.get(0).all(by.repeater('answer in question.answers')).get(0).click();
			questions.get(1).all(by.repeater('answer in question.answers')).get(1).click();
			questions.get(2).all(by.repeater('answer in question.answers')).get(2).click();
			element.all(by.buttonText('Пройти тест')).click()
		});

		it('should show quiz result page heading with current quiz title in it', function() {
			expect(element.all(by.binding('quiz.title')).getText()).
				toMatch('Тест на знання правил футболу');
		});

		it('should show that gained result equals 66.67 points', function() {
			expect(element.all(by.binding('quiz.result')).getText()).toMatch('66.67');
		});

		it('should show gained result equals that equals 66.67  points in result progress-bar', function() {
			expect(element.all(by.css('.progress .progress-bar')).getText()).
				toMatch('66.67%');
		});

		it('should show two questions that is marked as correct by green background color', function() {
			expect(element.all(by.css('.list-group-item-success')).count()).
				toBe(2);
		});

		it('should show question content with corresponding number', function() {
			var questions = element.all(by.repeater('question in quiz.questions'));
			expect(questions.get(0).all(by.binding('question.title')).getText()).
				toMatch('1. Скільки гравців в команді?');
		});

		it('should show that chosen answer in first questions is same as correct answer', function() {
			var questions = element.all(by.repeater('question in quiz.questions'));
			var chosenAnswer =  questions.get(0).all(by.css('.list-group .list-group-item')).first().getText();
			var correctAnswer = questions.get(0).all(by.css('.list-group .list-group-item')).last().getText();
			expect(chosenAnswer).toMatch(correctAnswer);
		});

		it('should show question description with explanation in it', function() {
			var questions = element.all(by.repeater('question in quiz.questions'));
			expect(questions.get(0).all(by.binding('question.description')).getText()).
				toMatch('Пояснення: Згідно правил на полі знаходиться 11 гравців однієї команди');
		});

		it('should show pass quiz page after pressing pass again button', function() {
			element.all(by.buttonText('Пройти тест знову')).click();
			expect(browser.getLocationAbsUrl()).
				toMatch('/assessments/1');
		});

	});

	describe('interaction with quiz result page after passing quiz (all answers correct)', function() {
		
		beforeEach(function() {
			browser.get('http://localhost:8000/#/assessments/1');
			var questions = element.all(by.repeater('question in quiz.questions'));
			questions.get(0).all(by.repeater('answer in question.answers')).get(0).click();
			questions.get(1).all(by.repeater('answer in question.answers')).get(1).click();
			questions.get(2).all(by.repeater('answer in question.answers')).get(0).click();
			questions.get(2).all(by.repeater('answer in question.answers')).get(1).click();
			element.all(by.buttonText('Пройти тест')).click()
		});

		it('should show that gained result equals 100 points', function() {
			expect(element.all(by.binding('quiz.result')).getText()).
				toMatch('100');
		});

		it('should show gained result equals that equals 100 points in result progress-bar', function() {
			expect(element.all(by.css('.progress .progress-bar')).getText()).
				toMatch('100%');
		});

		it('should show all questions marked as correct by green background color', function() {
			expect(element.all(by.css('.list-group-item-success')).count()).
				toBe(3);
		});

	});

});
