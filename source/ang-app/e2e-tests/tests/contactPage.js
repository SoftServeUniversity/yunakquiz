'use strict';

describe('contactPage', function(){

	var ptor =  protractor.getInstance();
	var mockModule = require('../mocked-backend.js');
	var contactPageTitle = 'Контакти';
	var firstContact = 'Адміністратор';
	var secondContact = 'Модератор';
	var thirdContact = 'Ще хтось';
	var firstContactAddress = '79000, Fedkovycha Str. 60A, building 1';
	var secondContactAddress = '79000, Fedkovycha Str. 60A, building 1';
	var thirdContactAddress = '79000, Fedkovycha Str. 60A, building 1';
	var firstContactEmail = 'someone@somemail.com';
	var secondContactEmail = 'someone@somemail.com';
	var thirdContactEmail = 'someone@somemail.com';
	var firstContactPhone = '+38 032 244-44-44';
	var secondContactPhone = '+38 032 244-44-44';
	var thirdContactPhone = '+38 032 244-44-44';

	beforeEach(function() {
    	ptor.addMockModule('httpBackendMock', mockModule.httpBackendMock);
    	browser.get('http://localhost:8000/#/contacts'); 
	});


	describe('contactMainInfoPresense', function() {
		
	    it('should have page title "Контакти"', function() {
	    	expect(element.all(by.css('.pageTitle')).getText()).toMatch(contactPageTitle);
	    });	
	    it('should be 3 contacts block', function() {
			expect(element.all(by.css('.rectangle')).count()).toBe(3);
		});
	    it('first contact should be "Адміністратор"', function() {
			expect(element.all(by.css('.rectangle')).get(0).getText()).toBe(firstContact);
		});
		it('second contact should be "Модератор"', function() {
			expect(element.all(by.css('.rectangle')).get(1).getText()).toBe(secondContact);
		});
		it('third contact should be "Ще хтось"', function() {
			expect(element.all(by.css('.rectangle')).get(2).getText()).toBe(thirdContact);
		});
		it('first contact address should be "79000, Fedkovycha Str. 60A, building 1"', function() {
			expect(element.all(by.css('.categories-container h4')).get(0).getText()).toBe(firstContactAddress);
		});
		it('second contact address should be "79000, Fedkovycha Str. 60A, building 1"', function() {
			expect(element.all(by.css('.categories-container h4')).get(1).getText()).toBe(secondContactAddress);
		});
		it('third contact address should be "79000, Fedkovycha Str. 60A, building 1"', function() {
			expect(element.all(by.css('.categories-container h4')).get(2).getText()).toBe(thirdContactAddress);
		});
		it('first contact email should be "someone@somemail.com"', function() {
			expect(element.all(by.css('.categories-container span')).get(0).getText()).toBe(firstContactEmail);
		});
		it('second contact email should be "someone@somemail.com"', function() {
			expect(element.all(by.css('.categories-container span')).get(1).getText()).toBe(secondContactEmail);
		});
		it('third contact email should be "someone@somemail.com"', function() {
			expect(element.all(by.css('.categories-container span')).get(2).getText()).toBe(thirdContactEmail);
		});
		it('first contact phone should be "+38 032 244-44-44"', function() {
			expect(element.all(by.css('.contacts')).get(0).getText()).toBe(firstContactPhone);
		});
		it('second contact phone should be "+38 032 244-44-44"', function() {
			expect(element.all(by.css('.contacts')).get(1).getText()).toBe(secondContactPhone);
		});
		it('third contact phone should be "+38 032 244-44-44"', function() {
			expect(element.all(by.css('.contacts')).get(2).getText()).toBe(thirdContactPhone);
		});

	});
	
});
