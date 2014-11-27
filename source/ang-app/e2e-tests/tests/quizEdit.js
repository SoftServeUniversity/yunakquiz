'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('QuizEdit', function() {
	var ptor =  protractor.getInstance();
 	var mockModule = require('../http_backend_quiz.js');
 	// ptor.addMockModule('httpBackendMock', mockModule.httpBackendMock);
	
	beforeEach(function() {
    	ptor.addMockModule('httpBackendMock', mockModule.httpBackendMock);  
 	});

	describe('Header', function() {
		
		beforeEach(function() {
			browser.get('http://localhost:8000/#/admin/assessments/1');
		});

	    it('should have page title ', function() {
	    	expect(element(by.css('.quiz .assessment-title')).getText()).
	        toMatch(/Редагування тесту/);
	    });

	    it('should have Quiz title', function() {
	    	var input = element(by.model('quiz.title'));
			expect(input.getAttribute('value')).toBe('Тест на знання правил футболу');
	    });

	    it('should have Quiz description', function() {
	      	var input = element(by.model('quiz.description'));
			expect(input.isPresent()).toBe(true);
	    });

	    it('should have Quiz tags', function() {
	      expect(element(by.model('quiz.tags')).isPresent()).toBe(true);
	    });

	    it('should have category with options', function() {
	      var select = element(by.model('selectedCat'));
		  var options = select.all(by.tagName('option'))
		  expect(options.count()).toBe(2);
	    });

	    it('should have subCategory with options', function() {
	      var select = element(by.model('selectedSubcat'));
		  var options = select.all(by.tagName('option'))
		  expect(options.count()).toBe(3);
	    });
	    
	    it('should have Quiz comment', function() {
	      expect(element.all(by.repeater('comment in comments')).count()).toBe(2);
	    });
	    

	});

  	describe('Body', function() {

	   	var questions;
 		
  		beforeEach(function() {
			browser.get('http://localhost:8000/#/admin/assessments/1');
			questions = element.all(by.repeater('question in quiz.questions'));
		});

	    it('should render quiz with three questions', function() {
	        expect(questions.count()).toBe(3);
	    });

	    it('should render quiz with three answers in first question', function() {
	        var answers = questions.get(0).all(by.repeater('answer in question.answers'))
	        expect(answers.count()).toBe(3);
      	});

      	it('in the first question first answer have to be correct', function() {
	        var answers = questions.get(0).all(by.repeater('answer in question.answers'))
	        expect(answers.get(0).all(by.css('.quizCorrectAnswer')).count()).toBe(1);
      	});

      	it('shoud have four correct answers', function() {
	        expect(element.all(by.css('.quiz .quizCorrectAnswer')).count()).toBe(4);
      	});

    });

  	describe('Adding and deleting new questions and answers', function() {

  		var questions;

		beforeEach(function() {
			browser.get('http://localhost:8000/#/admin/assessments/1');
			questions = element.all(by.repeater('question in quiz.questions'));
		});	    


	    it('should add new answer', function() {
	    	questions.get(0).element(by.css('[ng-click="addAnswer(question)"]')).click();
	        var answers = questions.get(0).all(by.repeater('answer in question.answers'))
	        expect(answers.count()).toBe(4);
      	});

      	it('should add new question', function() {
	    	element(by.css('[ng-click="addQuestion()"]')).click();
	        expect(questions.count()).toBe(4);
      	});

      	it('new question should have two blank answers', function() {
	        element(by.css('[ng-click="addQuestion()"]')).click();
	        var answers = questions.last().all(by.repeater('answer in question.answers'))
	        expect(answers.count()).toBe(2);
      	});

	    it('should be able to delete question', function() {
	        questions.last().element(by.css('[ng-click="deleteQuestion(question,$index)"]')).click();
	        expect(questions.count()).toBe(2);
      	});

      	it('should be able to delete answer', function() {
	        questions.get(0).all(by.css('[ng-click="deleteAnswer(answer)"]')).last().click();
	        var answers = questions.get(0).all(by.repeater('answer in question.answers'))
	        expect(answers.count()).toBe(2);
      	});
    	
    });
    
    describe('Saving and sending for review', function() {	
		var questions;
		var answers;

		beforeEach(function () {
    		browser.get('http://localhost:8000/#/admin/assessments/1');
	   		questions = element.all(by.repeater('question in quiz.questions'));
			


	    });
    	
	    it('should be able save valid Quiz', function() {
	    	var testMessage = 'test';
	    	questions.get(0).element(by.css('[ng-click="addAnswer(question)"]')).click();
			answers = questions.get(0).all(by.repeater('answer in question.answers'));
			answers.last().element(by.model('answer.title')).sendKeys(testMessage);
	        element(by.css('[ng-click="saveQuiz()"]')).click().then(function(){
	    		expect(browser.getCurrentUrl()).toEqual("http://localhost:8000/#/admin/personalCabinet/draft");
	    	});
      	});
		
		it('should be able send for review valid Quiz', function() {
			questions.get(0).element(by.css('[ng-click="addAnswer(question)"]')).click();
			answers = questions.get(0).all(by.repeater('answer in question.answers'));
			answers.last().element(by.model('answer.title')).sendKeys('test');	
 			element(by.css('[ng-click="reviewQuiz()"]')).click().then(function(){
	    		expect(browser.getCurrentUrl()).toEqual("http://localhost:8000/#/admin/personalCabinet/review");
	    	});

	            

	    });

	    it('should be able save Quiz - check by description', function() {
	        var descMsg = "Детальний опис";
	        var input = element(by.model('quiz.description'));
	        input.clear();
	        input.sendKeys(descMsg);
			element(by.css('[ng-click="saveQuiz()"]')).click().then(function(){
	    		expect(browser.getCurrentUrl()).toEqual("http://localhost:8000/#/admin/personalCabinet/draft");
	    	});
       	});

  	});
});
