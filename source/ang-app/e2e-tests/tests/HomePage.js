'use strict';

describe('HomePage', function(){

  var ptor =  protractor.getInstance();
  var mockModule = require('../mocked-backend.js');
  var headerMenuTitle = 'Система Пластових електронних опитників';
  var headerFirstMenuName = 'Головна';
  var headerSecondMenuName = 'Пошук';
  var headerThirdMenuName = 'Контакти';
  var headerFourthMenuName = 'Статистика';

  var headerFirstMenuUrl = 'http://localhost:8000/#/';
  var headerSecondMenuUrl = 'http://localhost:8000/#/guest-search';
  var headerThirdMenuUrl = 'http://localhost:8000/#/contacts';
  var headerFourthMenuUrl = 'http://localhost:8000/#/statistics';

  var footerFirstMenuName = 'Головна';
  var footerSecondMenuName = 'Про Нас';
  var footerThirdMenuName = 'Контакти';

  var footerFirstMenuUrl = 'http://localhost:8000/#/';
  var footerSecondMenuUrl = 'http://localhost:8000/#/about-us';
  var footerThirdMenuUrl = 'http://localhost:8000/#/contacts';

  var firstParCategory = 'Спорт';
  var secondParCategory = "Комп'ютери";
  var thirdParCategory = 'Туризм';

  var firstParCatContainerTestCount = 'Тестів: 8';
  var secondParCatContainerTestCount = 'Тестів: 4';
  var thirdParCatContainerTestCount = 'Тестів: 1';

  var firstParCatSubCatOne = 'Футбол';
  var firstParCatSubCatTwo = 'Хокей';
  var firstParCatSubCatThree = 'Баскетбол';

  var secondParCatSubCatOne = 'Комплектуючі';
  var secondParCatSubCatTwo = 'Програмування';
  var secondParCatSubCatThree = 'Мережі';

  var thirdParCatSubCatOne = 'Країни';
  var thirdParCatSubCatTwo = 'Столиці';
  var thirdParCatSubCatThree = 'Гори';

  var firstParCatUrl = 'http://localhost:8000/#/parentcat-page/1';
  var secondParCatUrl = 'http://localhost:8000/#/parentcat-page/3';
  var thirdParCatUrl = 'http://localhost:8000/#/parentcat-page/4';
  var firstParCatFirstSubCatUrl = 'http://localhost:8000/#/subcategory/2';
  var firstParCatSecondSubCatUrl = 'http://localhost:8000/#/subcategory/6';
  var firstParCatThirdSubCatUrl = 'http://localhost:8000/#/subcategory/7';
  var secondParCatFirstSubCatUrl = 'http://localhost:8000/#/subcategory/8';
  var secondParCatSecondSubCatUrl = 'http://localhost:8000/#/subcategory/9';
  var secondParCatThirdSubCatUrl = 'http://localhost:8000/#/subcategory/10';
  var thirdParCatFirstSubCatUrl = 'http://localhost:8000/#/subcategory/5';
  var thirdParCatSecondSubCatUrl = 'http://localhost:8000/#/subcategory/11';
  var thirdParCatThirdSubCatUrl = 'http://localhost:8000/#/subcategory/12';


  beforeEach(function() {
      ptor.addMockModule('httpBackendMock', mockModule.httpBackendMock); 
  });

  describe('HeaderMenu', function() {
    
    browser.get('http://localhost:8000/#/');
    
    function headerGetMenuItems(elemNumber){
      var headerMenu = element.all(by.css('.header-navmenu li'));
      var curentElem = headerMenu.get(elemNumber).all(by.css('a')).get(0).getText();
      return curentElem
    };

      it('should have page title ', function() {
        expect(element(by.css('.page-header h4')).getText()).
          toMatch(headerMenuTitle);
      });
      it('should have menu option named Головна', function() {
        expect(headerGetMenuItems(0)).
          toMatch(headerFirstMenuName);
      });
      it('should have menu option named Пошук', function() {
        expect(headerGetMenuItems(1)).
          toMatch(headerSecondMenuName);
      });
      it('should have menu option named Контакти', function() {
        expect(headerGetMenuItems(2)).
          toMatch(headerThirdMenuName);
      });
      it('should have menu option named Статистика', function() {
        expect(headerGetMenuItems(3)).
          toMatch(headerFourthMenuName);
      });
  });
  describe('HeaderMenuOnClick', function() {
    
    function headerMenuItemsClick(elemNumber){
      var headerMenu = element.all(by.css('.header-navmenu li'));

      headerMenu.get(elemNumber).all(by.css('a')).get(0).click();
    };

    beforeEach(function() {
      browser.get('http://localhost:8000/#/');
    });

      it('should redirect to Home page when clicked on Головна menu option', function(){
      headerMenuItemsClick(0);
      expect(browser.getLocationAbsUrl()).toMatch(headerFirstMenuUrl);
    });
    it('should redirect to Guest-search when clicked on Пошук menu option', function(){
      headerMenuItemsClick(1);
      expect(browser.getLocationAbsUrl()).toMatch(headerSecondMenuUrl);
    });
    it('should redirect to contacts when clicked on Контакти menu option', function(){
      headerMenuItemsClick(2);
      expect(browser.getLocationAbsUrl()).toMatch(headerThirdMenuUrl);
    });
    it('should redirect to statistics when clicked on Статистика menu option', function(){
      headerMenuItemsClick(3);
      expect(browser.getLocationAbsUrl()).toMatch(headerFourthMenuUrl);
    });
    
  });
  describe('Footer', function() {

    function footerGetMenuItems(elemNumber){
      var footMenu = element.all(by.css('.footer-menu li'));
      var curentElem = footMenu.get(elemNumber).all(by.css('a')).get(0).getText();
      return curentElem
    };

    browser.get('http://localhost:8000/#/');

    it('should have menu option named Головна', function() {
        expect(footerGetMenuItems(0)).
          toMatch(footerFirstMenuName);
      });
      it('should have menu option named Про Нас', function() {
        expect(footerGetMenuItems(1)).
          toMatch(footerSecondMenuName);
      });
      it('should have menu option named Контакти', function() {
        expect(footerGetMenuItems(2)).
          toMatch(footerThirdMenuName);
      });
  });
  describe('FooterOnClick', function() {
    function footerMenuItemsClick(elemNumber){
      var footerMenu = element.all(by.css('.footer-menu li'));

        footerMenu.get(elemNumber).all(by.css('a')).get(0).click();
    };
    // var footMenu = element.all(by.css('.footer-menu li'));

    beforeEach(function() {
      browser.get('http://localhost:8000/#/');
    });
      it('should redirect to Home page when clicked on Головна footer menu option', function(){
      footerMenuItemsClick(0);
      expect(browser.getLocationAbsUrl()).toMatch(footerFirstMenuUrl);
    });
    it('should redirect to About-Us when clicked on Про Нас footer menu option', function(){
      footerMenuItemsClick(1);
      expect(browser.getLocationAbsUrl()).toMatch(footerSecondMenuUrl);
    });
    it('should redirect to contacts when clicked on Контакти footer menu option', function(){
      footerMenuItemsClick(2);
      expect(browser.getLocationAbsUrl()).toMatch(footerThirdMenuUrl);
    });

  });

  describe('categoriesContainer', function() {
    var parCatContainer = element.all(by.css('.rectangle'));
    
    function parCatItems(elemNumber){
      var parCatContainer = element.all(by.css('.rectangle'));
      var curentElem = parCatContainer.get(elemNumber).getText();
      return curentElem
    };

    function subCatTestMsgs(elemNumber){
      var subCats = element.all(by.css('li .quote-author'));
      var curentElem = subCats.get(elemNumber).getText();
      return curentElem
    };

    function subCatItems(catNumber, elemNumber){
      var subCatContainer = element.all(by.css('.categories-container')) 
      var curentElem = subCatContainer.get(catNumber).all(by.css('a')).get(elemNumber).getText();
      return curentElem
    };

    function subCatContainer(elemNumber){
      var subCatContainer = element.all(by.css('.categories-container')) 
      var curentElem = subCatContainer.get(elemNumber).all(by.css('a')).count();
      return curentElem
    };

    beforeEach(function() {

        browser.get('http://localhost:8000/#/');
    });
  
      it('should be 3 Parent Categories', function() {
      expect(parCatContainer.count()).toBe(3);
    });
    it('first parent Category should be Спорт', function() {
      expect(parCatItems(0)).toBe(firstParCategory);
    });
    it('second parent Category should be Комп\'ютери', function() {
      expect(parCatItems(1)).toBe(secondParCategory);
    });
    it('third parent Category should be Туризм', function() {
      expect(parCatItems(2)).toBe(thirdParCategory);
    });
    it('in first parent Category container field "Тест" should be equal to 8', function() {
      expect(subCatTestMsgs(0)).toBe(firstParCatContainerTestCount);
    });
    it('in second parent Category container field "Тест" should be equal to 4', function() {
      expect(subCatTestMsgs(1)).toBe(secondParCatContainerTestCount);
    });
    it('in third parent Category container field "Тест" should be equal to 1', function() {
      expect(subCatTestMsgs(2)).toBe(thirdParCatContainerTestCount);
    });
    it('First parent Category container should have three subcategories', function() {
      expect(subCatContainer(0)).toBe(3);
    });
    it('Second parent Category container should have three subcategories', function() {
      expect(subCatContainer(1)).toBe(3);
    });
    it('Third parent Category container should have three subcategories', function() {
      expect(subCatContainer(2)).toBe(3);
    });
    it('in First parent Category container first subcategory should have name "Футбол"', function() {
      expect(subCatItems(0, 0)).toBe(firstParCatSubCatOne);
    });
    it('in First parent Category container second subcategory should have name "Хокей"', function() {
      expect(subCatItems(0, 1)).toBe(firstParCatSubCatTwo);
    });
    it('in First parent Category container third subcategory should have name "Баскетбол"', function() {
      expect(subCatItems(0, 2)).toBe(firstParCatSubCatThree);
    });
    it('in Second parent Category container first subcategory should have name "Комплектуючі"', function() {
      expect(subCatItems(1, 0)).toBe(secondParCatSubCatOne);
    });
    it('in Second parent Category container second subcategory should have name "Програмування"', function() {
      expect(subCatItems(1, 1)).toBe(secondParCatSubCatTwo);
    });
    it('in Second parent Category container third subcategory should have name "Мережі"', function() {
      expect(subCatItems(1, 2)).toBe(secondParCatSubCatThree);
    });
    it('in Third parent Category container first subcategory should have name "Країни"', function() {
      expect(subCatItems(2, 0)).toBe(thirdParCatSubCatOne);
    });
    it('in Third parent Category container second subcategory should have name "Столиці"', function() {
      expect(subCatItems(2, 1)).toBe(thirdParCatSubCatTwo);
    });
    it('in Third parent Category container third subcategory should have name "Гори"', function() {
      expect(subCatItems(2, 2)).toBe(thirdParCatSubCatThree);
    });
  });

  describe('categoriesContainerClick', function() {
    var parCats = element.all(by.css('.rectangle'));
    var subCats = element.all(by.css('.categories-container'));

    beforeEach(function() {
        browser.get('http://localhost:8000/#/');
    });
    it('click on first ParCat should redirect to category page and link should match http://localhost:8000/#/parentcat-page/1', function(){
      parCats.get(0).click();
      expect(browser.getLocationAbsUrl()).toMatch(firstParCatUrl);
    });
    it('click on second ParCat should redirect to category page and link should match http://localhost:8000/#/parentcat-page/3', function(){
      parCats.get(1).click();
      expect(browser.getLocationAbsUrl()).toMatch(secondParCatUrl);
    });
    it('click on third ParCat should redirect to category page and link should match http://localhost:8000/#/parentcat-page/4', function(){
      parCats.get(2).click();
      expect(browser.getLocationAbsUrl()).toMatch(thirdParCatUrl);
    });
    it('in First ParCat click on first subCat should redirect to subcategory page and link should match http://localhost:8000/#/subcategory/2', function(){
      subCats.get(0).all(by.css('a')).get(0).click();
      expect(browser.getLocationAbsUrl()).toMatch(firstParCatFirstSubCatUrl);
    });
    it('in First ParCat click on second subCat should redirect to subcategory page and link should match http://localhost:8000/#/subcategory/6', function(){
      subCats.get(0).all(by.css('a')).get(1).click();
      expect(browser.getLocationAbsUrl()).toMatch(firstParCatSecondSubCatUrl);
    });
    it('in First ParCat click on third subCat should redirect to subcategory page and link should match http://localhost:8000/#/subcategory/7', function(){
      subCats.get(0).all(by.css('a')).get(2).click();
      expect(browser.getLocationAbsUrl()).toMatch(firstParCatThirdSubCatUrl);
    });
    it('in Second ParCat click on first subCat should redirect to subcategory page and link should match http://localhost:8000/#/subcategory/8', function(){
      subCats.get(1).all(by.css('a')).get(0).click();
      expect(browser.getLocationAbsUrl()).toMatch(secondParCatFirstSubCatUrl);
    });
    it('in Second ParCat click on second subCat should redirect to subcategory page and link should match http://localhost:8000/#/subcategory/9', function(){
      subCats.get(1).all(by.css('a')).get(1).click();
      expect(browser.getLocationAbsUrl()).toMatch(secondParCatSecondSubCatUrl);
    });
    it('in Second ParCat click on third subCat should redirect to subcategory page and link should match http://localhost:8000/#/subcategory/10', function(){
      subCats.get(1).all(by.css('a')).get(2).click();
      expect(browser.getLocationAbsUrl()).toMatch(secondParCatThirdSubCatUrl);
    });
    it('in Third ParCat click on first subCat should redirect to subcategory page and link should match http://localhost:8000/#/subcategory/5', function(){
      subCats.get(2).all(by.css('a')).get(0).click();
      expect(browser.getLocationAbsUrl()).toMatch(thirdParCatFirstSubCatUrl);
    });
    it('in Third ParCat click on second subCat should redirect to subcategory page and link should match http://localhost:8000/#/subcategory/11', function(){
      subCats.get(2).all(by.css('a')).get(1).click();
      expect(browser.getLocationAbsUrl()).toMatch(thirdParCatSecondSubCatUrl);
    });
    it('in Third ParCat click on third subCat should redirect to subcategory page and link should match http://localhost:8000/#/subcategory/12', function(){
      subCats.get(2).all(by.css('a')).get(2).click();
      expect(browser.getLocationAbsUrl()).toMatch(thirdParCatThirdSubCatUrl);
    });

  });

});
