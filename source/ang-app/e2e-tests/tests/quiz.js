'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('quiz', function() {

	describe('kl;jl;jkl;', function() {


		browser.get('http://localhost:8000/#/assessments/1');

	    it('should render first quiz title', function() {
	      expect(element.all(by.css('.quiz .assessment-title')).first().getText()).
	        toMatch(/Тест на знання правил футболу/);
	    });

	    it('should render quiz with three questions', function() {
	      expect(element.all(by.css('ul.assessmentQuestion li')).count()).
	        toMatch(3);
	    });

	    it('should render quiz page with failed validation ', function() {
	    	element.all(by.css('.quiz button.btn')).click();
	        expect(browser.getLocationAbsUrl()).
	        toMatch('http://localhost:8000/#/assessments/1');
	    });



  	});

  	describe('pass with one wrong answer in last question', function() {

		
	    browser.get('http://localhost:8000/#/assessments/1');
	   

	    it('should render quiz with three questions', function() {
	        var elems = element.all(by.repeater('question in quiz.questions'));
	        expect(elems.count()).toBe(3);
      	});

	    it('should select three correct and one wrong answers', function() {
	        var elems = element.all(by.repeater('question in quiz.questions'));
	        elems.get(0).all(by.repeater('answer in question.answers')).get(0).click();
	        elems.get(1).all(by.repeater('answer in question.answers')).get(1).click();
	        elems.get(2).all(by.repeater('answer in question.answers')).get(0).click();
	        elems.get(2).all(by.repeater('answer in question.answers')).get(2).click();
	        expect(element.all(by.css('li.list-group-item-info')).count()).toBe(4);
      	});
    	
		it('should render quiz-result-page', function() {
		    element.all(by.css('quiz button.btn')).click();
		    expect(browser.getLocationAbsUrl()).
		    toMatch('http://localhost:8000/#/assessments/1/result');
	    });	

		it('should render result-page with result 67%', function() {
	      	expect(element.all(by.binding('counter')).getText()).
	        toMatch('67');
	    });


  	});

  	describe('pass with right answers assessment', function() {

	    browser.get('http://localhost:8000/#/assessments/1');

	    it('should render quiz with three questions', function() {
	    	browser.get('http://localhost:8000/#/assessments/1');
	        var elems = element.all(by.repeater('question in quiz.questions'));
	        expect(elems.count()).toBe(3);
      	});

	    it('should select four correct answers', function() {
	        var elems = element.all(by.repeater('question in quiz.questions'));
	        elems.get(0).all(by.repeater('answer in question.answers')).get(0).click();
	        elems.get(1).all(by.repeater('answer in question.answers')).get(1).click();
	        elems.get(2).all(by.repeater('answer in question.answers')).get(0).click();
	        elems.get(2).all(by.repeater('answer in question.answers')).get(1).click();
	        expect(element.all(by.css('li.list-group-item-info')).count()).toBe(4);
      	});
    	
		it('should render quiz-result-page', function() {
		    element.all(by.css('button.btn')).click();
		    expect(browser.getLocationAbsUrl()).
		    toMatch('http://localhost:8000/#/assessments/1/result');
	    });	

		it('should render result-page with result 100%', function() {
	      	expect(element.all(by.binding('counter')).getText()).
	        toMatch('100');
	    });



  	});

});
