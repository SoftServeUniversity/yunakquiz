'use strict';

describe('Guest search page', function(){

  var ptor =  protractor.getInstance();
  var mockModule = require('../guest-search-mocked-backend.js');
  ptor.addMockModule('httpBackendMock', mockModule.httpBackendMock);  


  var category1 = {"id":1,"category_id":0,"title":"Спорт"};
  var subcategory1 = {"id":2,"category_id":1,"title":"Футбол"};
  var subcategory2 = {"id":3,"category_id":1,"title":"Хокей"};

  var category2 = {"id":4,"category_id":0,"title":"Історія"};
  var subcategory3 = {"id":5,"category_id":4,"title":"Історія України"};
  var subcategory4 = {"id":6,"category_id":4,"title":"Історія світу"};

  var category3 = {"id":7,"category_id":0,"title":"Програмування"};
  var subcategory5 = {"id":8,"category_id":7,"title":"Основи ООП"};
  var subcategory6 = {"id":9,"category_id":7,"title":"Основи Java"};

  // Cheking main parts of page like header and url
  describe('checking header on the page and url', function() {

    beforeEach(function(){
      browser.get('http://localhost:8000/#/guest-search');
    });

    it('i should be on the guest-search page', function(){
      expect(browser.driver.getCurrentUrl()).toMatch("#/guest-search");
    })

    it('i should see Гостьовий пошук when on the page', function(){
        expect(element(by.css('h3.pageTitle')).getText()).toMatch('Гостьовий пошук');
    });

  });
 }); 


  /*describe('Checking of all categories in category filter', function(){

    beforeEach(function(){
      browser.get('http://localhost:8000/#/guest-search');
    });

      it('should see all categories title in filter part', function(){
        expect(element(by.css('h3.pageTitle')).getText()).toMatch('Гостьовий пошук');
      });

      it('should see par-categories', function(){
        expect(element.all(by.repeater('parCat in allCats')).count()).toEqual(3);
      });
  });

})

/*
      it('should see sub-categories ', function(){
        expect(element.all(by.repeater('subCat in allCats')).count()).toEqual(2);
      });

      // testing 1 subcategory in 1 category

      it('should see first subcategory title', function(){
        expect(element.all(by.css('.rectangle')).get(0).getText()).toMatch(subcategory1[0].title);
      });

      it('should show all quizzes of 1 subCat', function(){
        var firstSubCat = element.all(by.css('.categories-container'));
        var firstSubCatQuiz = firstSubCat.get(0).all(by.repeater('quizz in quizzes'));
        var firstSubCatLength = quizzes2.length;
        expect(firstSubCatQuiz.count()).toEqual(firstSubCatLength);
      });

      it('click on first subcategory', function(){
        var firstSubCat = element.all(by.css('.rectangle'));
        firstSubCat.get(0).click();
        expect(browser.getLocationAbsUrl()).toMatch('http://localhost:8000/#/subcategory/2');
      });

      // testing 2 subcategory in 1 category


element(by.buttonText('Реєстрація')).click();
*/
