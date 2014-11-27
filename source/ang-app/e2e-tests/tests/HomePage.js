'use strict';

describe('HomePage', function(){

  var ptor =  protractor.getInstance();
  var mockModule = require('../mocked-backend.js');
  var headerMenuTitle = 'Система Пластових електронних опитників';
  var HeaderMenu = [
      {menuName: 'Головна', menuClass: '.menuHomeLnk',url: '/'},
      {menuName: 'Пошук', menuClass: '.menuSearchLnk', url: '/guest-search'},
      {menuName: 'Контакти', menuClass: '.menuContactsLnk', url: '/contacts'},
      {menuName: 'Статистика', menuClass: '.menuStatisticsLnk', url: '/statistics'}
      ];
  var FooterMenu = [
      {menuName: 'Головна', menuClass: '.footerHomeLnk', url: '/'},
      {menuName: 'Про Нас', menuClass: '.footerAboutLnk', url: '/about-us'},
      {menuName: 'Контакти', menuClass: '.footerContactsLnk', url: '/contacts'},
      ];
  var parCategories = [
      {catName: 'Спорт', testcount: 'Тестів: 8', subcatQuantity: 3, url: '/parentcat-page/1'},
      {catName: "Комп'ютери", testcount: 'Тестів: 4', subcatQuantity: 3, url: '/parentcat-page/3'},
      {catName: 'Туризм', testcount: 'Тестів: 1', subcatQuantity: 3, url: 'parentcat-page/4'}
      ];
  var subCategories = [
      [
       {catName:'Футбол', url: '/subcategory/2'},
       {catName:'Хокей', url: '/subcategory/6'},
       {catName:'Баскетбол', url: '/subcategory/7'}
      ],
      [
       {catName:'Комплектуючі', url: '/subcategory/8'},
       {catName:'Програмування', url: '/subcategory/9'},
       {catName:'Мережі', url: '/subcategory/10'}
      ],
      [
       {catName:'Країни', url: '/subcategory/5'},
       {catName:'Столиці', url: '/subcategory/11'},
       {catName:'Гори', url: '/subcategory/12'}
      ]
      ];

  var parCategoriesQuantity = 3;


  beforeEach(function () {
      ptor.addMockModule('httpBackendMock', mockModule.httpBackendMock); 
  });

  function checkMenuItems(menuName) {
    menuName.forEach(function (menuItem) {
      var curelem = element(by.css(menuItem.menuClass)).getText();

      expect(curelem).toMatch(menuItem.menuName);
    });
  };

  function menuItemsClick(menuName) {
    menuName.forEach(function (menuItem) {
      var curelem = element(by.css(menuItem.menuClass));

      curelem.click();
      expect(browser.getLocationAbsUrl()).toMatch(menuItem.url);
    });
  };

  function parCatItems(elemNumber) {
    var parCatContainer = element.all(by.css('.rectangle'));
    var curentElem = parCatContainer.get(elemNumber).getText();
      return curentElem
  };

  describe('HeaderMenu', function () {
    
    browser.get('http://localhost:8000/#/');
    
    var headerTitle = element(by.css('.page-header h4')).getText();


    it('All menu items should be and corectly named', function () {
      expect(headerTitle).toMatch(headerMenuTitle);
    });
    it('Header title should be corectly named', function () {
      checkMenuItems(HeaderMenu);
    });   

  });

  describe('HeaderMenuOnClick', function () {
    

    beforeEach(function () {
      browser.get('http://localhost:8000/#/');
    });

    it('should redirect on each menuitem to corresponding linc', function () {
      menuItemsClick(HeaderMenu);
     });
 });
  describe('Footer', function () {

    browser.get('http://localhost:8000/#/');

    it('All menu items should be and corectly named', function () {
      checkMenuItems(FooterMenu);
    });
  });

  describe('FooterClick', function () {
    beforeEach(function () {
      browser.get('http://localhost:8000/#/');
    });

    it('should redirect on each menuitem to corresponding linc', function() {
      menuItemsClick(FooterMenu);
    });
  });

  describe('categoriesContainer', function () {
    var parCatContainer = element.all(by.repeater('parCat in parCategories'));

    function getCatTestQuantity(elemNumber){
      var subCats = element.all(by.css('li .quote-author'));
      var curentElem = subCats.get(elemNumber).getText();
      return curentElem
    };

    function subCatItems(catNumber, elemNumber){
      var subCatContainer = element.all(by.className('categories-container'));
      var curentElem = subCatContainer.get(catNumber).all(by.binding('subCat.title')).get(elemNumber).getText();
      return curentElem
    };

    function subCatContainer(elemNumber){
      var subCatContainer = element.all(by.className('categories-container')); 
      var curentElem = subCatContainer.get(elemNumber).all(by.binding('subCat.title')).count();
      return curentElem
    };
    function parCategoriesNameCheck(){
      for(var i = 0; i < parCategoriesQuantity; i++){
        expect(parCatItems(i)).toBe(parCategories[i].catName);
      }
    };
    function parCategoriesTestCount(){
      for(var i = 0; i < parCategoriesQuantity; i++){
        expect(getCatTestQuantity(i)).toBe(parCategories[i].testcount);
      }
    };

    function subCatCountInParCatContainer(){
      for(var i = 0; i < parCategoriesQuantity; i++){
        expect(subCatContainer(i)).toBe(parCategories[i].subcatQuantity);
      }
    };
    function checkCategoriesNameInParCatContainer(){
      for(var i = 0; i < parCategoriesQuantity;i++) {
        for(var j = 0; j < parCategories[i].subcatQuantity; j++){
        expect(subCatItems(i, j)).toBe(subCategories[i][j].catName); 
        }
      }
    }
    beforeEach(function () {
      browser.get('http://localhost:8000/#/');
      ptor.addMockModule('httpBackendMock', mockModule.httpBackendMock); 
    });
  
    it('should be 3 Parent Categories', function () {
      expect(parCatContainer.count()).toBe(parCategoriesQuantity);
    });
    it('all categories should have coresponding names', function () {
      parCategoriesNameCheck(parCategoriesQuantity);
    });

    it('all parCategories should have coresponding testcount', function () {
      parCategoriesTestCount(parCategoriesQuantity);
    });
    it('each parCategory container should have coresponding quantity of subcats', function () {
      subCatCountInParCatContainer(parCategoriesQuantity);
    });

    it('all subcategories should have corespinding names', function () {
      checkCategoriesNameInParCatContainer(parCategoriesQuantity);
    });
  });

  describe('categoriesContainerClick', function () {
      

    function parCatItems(elemNumber) {
      var parCatContainer = element.all(by.css('.rectangle'));
      var curentElem = parCatContainer.get(elemNumber);
        return curentElem;
    };

    function checkParCatClickLinkLoaction() {
      for(var i = 0; i < parCategoriesQuantity; i++) {
        browser.get('http://localhost:8000/#/');
        parCatItems(i).click();
        expect(browser.getLocationAbsUrl()).toMatch(parCategories[i].url);
      }
    }
    function checkSubCatClickLinkLocation(){
      for(var i = 0; i < parCategoriesQuantity;i++) {
        for(var j = 0; j < parCategories[i].subcatQuantity; j++){
          browser.get('http://localhost:8000/#/');
          element.all(by.css('.categories-container')).get(i).all(by.binding('subCat.title')).get(j).click(); 
          expect(browser.getLocationAbsUrl()).toMatch(subCategories[i][j].url);
        }
      }
    }
    beforeEach(function () {
        browser.get('http://localhost:8000/#/');
        ptor.addMockModule('httpBackendMock', mockModule.httpBackendMock); 
    });
    it('click ParCats should redirect to corresponding link', function () {
      checkParCatClickLinkLoaction();
    });
    it('click subCats should redirect to corresponding link', function () {
      checkSubCatClickLinkLocation();
    });
  });
});
