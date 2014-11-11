'use strict';

xdescribe('ModerationlCabinet', function() {
	var ptor =  protractor.getInstance();
 	var mockModule = require('../http_backend_quiz.js');
 	ptor.addMockModule('httpBackendMock', mockModule.httpBackendMock);

 	describe('page structure', function() {
		
		beforeEach(function() {
			browser.get('http://localhost:8000/#/admin/moderationCabinet');
		});

		it('should have title', function() {
			expect(element(by.css('.assessment-title')).getText())
			.toMatch(/Кабінет модератора/);
		});

		it('should have Category filter', function() {
			expect(element.all(by.repeater('parCat in allCats')).count()).toBe(3);
		});

		it('should have Category filter button', function() {
			expect(element(by.buttonText('Застосувати фільтр')).isPresent()).toBe(true);
		});

		it('should have 3 tabs: published, enhance, review', function() {
			expect(element.all(by.css('ul.nav li')).count()).toBe(3);
			
		});

	});

	describe('Published tab view', function() {
		
		beforeEach(function() {
			browser.get('http://localhost:8000/#/admin/moderationCabinet/published');
		});

		it('should show pablished tab activeted ', function() {
			var tab = element.all(by.css('ul.nav li.persCabActive'))
			expect(tab.getText()).toMatch(/Опубліковані/); 
			

		});

		it('should show table title', function() {
			expect(element.all(by.css('table thead tr th')).count()).toBe(5);
		
		});

		it('should show n Quizzess', function() {
			expect(element.all(by.repeater('quiz in quizzes')).count()).toBe(13);
		});

		it('should show Edit button', function() {
			var quizzess = element.all(by.repeater('quiz in quizzes'));
			expect(quizzess.get(0).element(by.linkText('Перевірити тест')).getAttribute('href'))
			.toMatch('#/admin/moderationCabinet/review/1')

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
