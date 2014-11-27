'use strict';

describe('ModerationlCabinet', function() {
	var ptor =  protractor.getInstance();
 	var mockModule = require('../cabinets-backend.js');
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

		it('should move to enhance', function() {
			element(by.linkText("На доопрацюванні")).click()
			expect(browser.getLocationAbsUrl()).toMatch('admin/moderationCabinet/enhance');
		});

		it('should move to review', function() {
			element(by.linkText("Незатверджені")).click()
			expect(browser.getLocationAbsUrl()).toMatch('admin/moderationCabinet/review');
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

		it('should show 5 Quizzess', function() {
			expect(element.all(by.repeater('quiz in quizzes')).count()).toBe(5);
		});

		it('should show review button', function() {
			var quizzess = element.all(by.repeater('quiz in quizzes'));
			expect(quizzess.get(0).element(by.linkText('Перевірити тест')).getAttribute('href'))
			.toMatch('#/admin/assessments/review/')

		});

		it('should show Delete button', function() {
			var quizzess = element.all(by.repeater('quiz in quizzes'))
			expect(quizzess.get(0).element(by.linkText('Видалити тест')).isPresent()).toBe(true);
		});

		it('should show error msg', function() {
			element.all(by.linkText('Видалити тест')).first().click()
			browser.sleep(1000);
			element(by.model('pwd.password')).sendKeys('1234567');
			element(by.buttonText('Видалити')).click();
			expect(element(by.binding('errorMsg')).getText())
			.toMatch(/Невірний пароль/);
		});

		it('should close modal', function() {
			element.all(by.linkText('Видалити тест')).first().click()
			browser.sleep(1000);
			element(by.model('pwd.password')).sendKeys('1234567');
			element(by.buttonText('Видалити')).click();
			expect(element(by.css('.modal-dialog')).isPresent()).toBe(false);
		});

		it('should show pagination', function() {
			expect(element(by.css('ul.pagination')).isPresent()).toBe(true);
		});

	});



});
