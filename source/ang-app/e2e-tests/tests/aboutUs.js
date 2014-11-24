'use strict';

describe('aboutUs', function () {

  var ptor =  protractor.getInstance();
  var mockModule = require('../mocked-backend.js');
  var aboutUsTitle = 'Про пласт';
  var aboutUsMatch = 'ABOUT US WORKS';
  
  beforeEach(function () {
      ptor.addMockModule('httpBackendMock', mockModule.httpBackendMock);
  });

  describe('aboutUs', function () {
    browser.get('http://localhost:8000/#/about-us'); 
    
    var aboutUsTitleElement = element.all(by.css('.pageTitle')).getText();
    
    beforeEach(function () {
      browser.get('http://localhost:8000/#/about-us'); 
    });
    function aboutUsContentCheck() {
      expect(element.all(by.css('h5')).getText()).toMatch(aboutUsMatch);
    }
      it('should have page title "Про пласт"', function () {
        expect(aboutUsTitleElement).toMatch(aboutUsTitle);
      }); 
      it('should have page which contain frase "ABOUT US WORKS"', function () {
        aboutUsContentCheck();
      }); 
  });
  
});

