'use strict';

describe('PersonalCabinet', function() {
	var ptor =  protractor.getInstance();
 	var mockModule = require('../cabinets-backend.js');
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

		it('should move to enhance', function() {
			element(by.linkText('Недоопрацьовані')).click()
			expect(browser.getLocationAbsUrl()).toMatch('admin/personalCabinet/enhance');
		});

		it('should move to review', function() {
			element(by.linkText('Незатверджені')).click()
			expect(browser.getLocationAbsUrl()).toMatch('admin/personalCabinet/review');
		});

		it('should move to draft', function() {
			element(by.linkText('Створені')).click()
			expect(browser.getLocationAbsUrl()).toMatch('admin/personalCabinet/draft');
		});

		it('should have search input', function() {
			var input = element(by.model("outputData.searchData"));
			expect(input.isPresent()).toBe(true);
		});

	});

	describe('published tab view', function() {
		
		beforeEach(function() {
			browser.get('http://localhost:8000/#/admin/personalCabinet/published');
		});

		it('should show published tab activeted ', function() {
			var tab = element.all(by.css('ul.nav li.persCabActive'))
			expect(tab.getText()).toMatch(/Опубліковані/); 
		});

		it('should show table title', function() {
			expect(element.all(by.css('table thead tr th')).count()).toBe(6);
		});

		it('should show 5 Quizzess', function() {
			expect(element.all(by.repeater('quiz in quizzes')).count()).toBe(5);
		});

		it('should show Edit button', function() {
			var quizzess = element.all(by.repeater('quiz in quizzes'));
			expect(quizzess.get(0).element(by.linkText('Редагувати тест')).getAttribute('href'))
			.toMatch('#/admin/assessments/')
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
