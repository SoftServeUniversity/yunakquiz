'use strict';

describe('Guest search page', function() {

  var ptor = protractor.getInstance();
  var mockModule = require('../guest-search-mocked-backend.js');

  var searchButton = element(by.buttonText('Пошук'));
  var applyFilterButton = element(by.buttonText('Застосувати фільтр')); 
  var input = element(by.model('newTag.text'));
  var firstResult = element.all(by.repeater('quiz in searchResults')).get(0);
  var secondResult = element.all(by.repeater('quiz in searchResults')).get(1);

  beforeEach(function() {  
    ptor.addMockModule('httpBackendMock', mockModule.httpBackendMock);
    browser.get('http://localhost:8000/#/guest-search');
  });

  describe('General view of page', function() {

    describe('View of tags input', function() {

      it('Then i should be on the guest-search page', function(){
        expect(browser.driver.getCurrentUrl()).toMatch("#/guest-search");
      })

      it('And I see guest search page with header', function(){
        expect(element(by.css('h3.pageTitle')).getText()).toMatch('Гостьовий пошук');
      });

      it('And text input form with "Search" button', function(){
        input.sendKeys('історія');
        searchButton.click();
        expect(element.all(by.repeater('quiz in searchResults')).count()).toEqual(2);
      });

    }); 

    describe('View of category filter menu', function() {

      it('i should see par-categories', function(){
        expect(element.all(by.repeater('parCat in allCats')).count()).toEqual(3);
      });

      it('i should see sub-categories', function(){
        expect(element.all(by.repeater('subCat in allCats')).count()).toEqual(27);
      });

      it('"Застосувати фільтр" button', function(){
        applyFilterButton.click();
        expect(element.all(by.repeater('quiz in searchResults')).count()).toEqual(2);
      });

    });

  });

  describe('View of search result', function() {

    beforeEach(function() {  
      ptor.addMockModule('httpBackendMock', mockModule.httpBackendMock);
      browser.get('http://localhost:8000/#/guest-search');
      input.sendKeys('історія');
      searchButton.click();
    });

    it('I should see title of quiz', function() {

      expect(firstResult.getText()).toContain('Друга світова війна');
      expect(secondResult.getText()).toContain('Тест на знання історії світу');

    });

    it('I should see description of quiz', function() {

      expect(firstResult.getText()).toContain('Детальний опис тесту');
      expect(secondResult.getText()).toContain('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras in fringilla quam. Donec arcu ex, egestas ut lobortis ac, tempus et nisl. Ut vulputate efficitur.');

    });

    it('I should see tags of quiz', function() {

      expect(firstResult.getText()).toContain('| історія | світ |');
      expect(secondResult.getText()).toContain('| світ | історія | всьо |');

    });

    it('When i prees on quiz title i should redirect to quiz pass page', function() {
      element(by.css('[href="#/assessments/3"]')).click();
      expect(browser.driver.getCurrentUrl()).toMatch("http://localhost:8000/#/404");
    });

  });  

});

