'use strict';

describe('Guest search page', function() {

  var ptor = protractor.getInstance();
  var mockModule = require('../mocked-backend.js');
  

  var category1 = {"id":1,"category_id":0,"title":"Спорт"};
  var subcategory1 = {"id":2,"category_id":1,"title":"Футбол"};
  var subcategory2 = {"id":3,"category_id":1,"title":"Хокей"};

  var category2 = {"id":4,"category_id":0,"title":"Історія"};
  var subcategory3 = {"id":5,"category_id":4,"title":"Історія України"};
  var subcategory4 = {"id":6,"category_id":4,"title":"Історія світу"};

  var category3 = {"id":7,"category_id":0,"title":"Програмування"};
  var subcategory5 = {"id":8,"category_id":7,"title":"Основи ООП"};
  var subcategory6 = {"id":9,"category_id":7,"title":"Основи Java"};

  beforeEach(function() {  
    ptor.addMockModule('httpBackendMock', mockModule.httpBackendMock);
    browser.get('http://localhost:8000/#/guest-search');
  });

  // Cheking main parts of page like header and url
  describe('checking header on the page and url', function() {

    it('i should be on the guest-search page', function(){
      expect(browser.driver.getCurrentUrl()).toMatch("#/guest-search");
    })

    it('i should see Гостьовий пошук when on the page', function(){
        expect(element(by.css('h3.pageTitle')).getText()).toMatch('Гостьовий пошук');
    });

  });

  describe('Checking of all categories in category filter', function() {

      it('i should see par-categories', function(){
        expect(element.all(by.repeater('parCat in allCats')).count()).toEqual(3);
      });

      it('i should see sub-categories', function(){
        expect(element.all(by.repeater('subCat in allCats')).count()).toEqual(27);
      });

  });
});
