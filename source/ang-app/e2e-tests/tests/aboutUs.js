'use strict';

describe('aboutUs', function(){

	var ptor =  protractor.getInstance();
	var mockModule = require('../mocked-backend.js');
	var aboutUsTitle = 'Про пласт';
	var aboutUsMatch = 'ABOUT US WORKS';
	
	beforeEach(function() {
    	ptor.addMockModule('httpBackendMock', mockModule.httpBackendMock);
    	browser.get('http://localhost:8000/#/about-us'); 
	});

	describe('aboutUs', function() {
		
	    it('should have page title "Про пласт"', function() {
	    	expect(element.all(by.css('.pageTitle')).getText()).toMatch(aboutUsTitle);
	    });	
	    it('should have page which contain frase "ABOUT US WORKS"', function() {
	    	expect(element.all(by.css('h5')).getText()).toMatch(aboutUsMatch);
	    });	

	});
	
});

