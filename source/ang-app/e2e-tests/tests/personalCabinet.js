'use strict';

describe('PersonalCabinet', function() {
	var ptor =  protractor.getInstance();
 	var mockModule = require('../http_backend_quiz.js');
 	ptor.addMockModule('httpBackendMock', mockModule.httpBackendMock);

 	describe('page structure', function() {
		
		beforeEach(function() {
			browser.get('http://localhost:8000/#/admin/personalCabinet');
		});

		it('should have title', function() {
			expect(element(by.css('.assessment-title')).getText())
			.toMatch(/Особистий кабінет/);
		});

		it('should have CreateNew button', function() {
			expect(element(by.linkText('Додати тест')).getAttribute('href'))
			.toMatch('#/admin/assessments/create/')

		});

		it('should have 5 tabs: published, enhance, review, draft and profile', function() {
			expect(element.all(by.css('ul.nav li')).count()).toBe(5);
			
		});

		it('should have search input', function() {
			var input = element(by.model("outputData.searchData"));
			expect(input.isPresent()).toBe(true);
		});

	});

	describe('Draft tab view', function() {
		
		beforeEach(function() {
			browser.get('http://localhost:8000/#/admin/personalCabinet/draft');
		});

		it('should show draft tab activeted ', function() {
			var tab = element.all(by.css('ul.nav li.active'))
			expect(tab.getText()).toMatch(/Створені/); 
			

		});

		it('should show table title', function() {
			expect(element.all(by.css('table thead tr th')).count()).toBe(6);
		
		});

		it('should show n Quizzess', function() {
			browser.pause();
			expect(element.all(by.repeater('quiz in quizzes')).count()).toBe(13);
		});

		it('should show Edit button', function() {
			var quizzess = element.all(by.repeater('quiz in quizzes'));
			expect(quizzess.get(0).element(by.linkText('Редагувати тест')).getAttribute('href'))
			.toMatch('#/admin/assessments/1')

		});

		it('should show Delete button', function() {
			var quizzess = element.all(by.repeater('quiz in quizzes'))
			expect(quizzess.get(0).element(by.linkText('Видалити тест')).isPresent()).toBe(true);
		});

		it('should show pagination', function() {
			expect(element(by.css('ul.pagination')).isPresent()).toBe(true);
		});

	});

	// xdescribe('Draft tab actions', function() {
		
	// 	beforeEach(function() {
	// 		browser.get('http://localhost:8000/#/admin/personalCabinet/draft');
	// 	});

	// 	it('should be able to search by title', function() {
		
	// 	});

	// 	it('should be able to edit Quiz', function() {
			
	// 	});

	// 	it('should be able to delete Quiz', function() {
			
	// 	});

	// });

	

});
