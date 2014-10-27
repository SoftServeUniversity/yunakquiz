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
		var headerMenu = element.all(by.css('.header-navmenu li'));

	    it('should have page title ', function() {
	    	expect(element(by.css('.page-header h4')).getText()).
	        toMatch(headerMenuTitle);
	    });
	    it('should have menu option named Головна', function() {
	    	expect(headerMenu.get(0).all(by.css('a')).get(0).getText()).
	        toMatch(headerFirstMenuName);
	    });
	    it('should have menu option named Пошук', function() {
	    	expect(headerMenu.get(1).all(by.css('a')).get(0).getText()).
	        toMatch(headerSecondMenuName);
	    });
	    it('should have menu option named Контакти', function() {
	    	expect(headerMenu.get(2).all(by.css('a')).get(0).getText()).
	        toMatch(headerThirdMenuName);
	    });
	    it('should have menu option named Статистика', function() {
	    	expect(headerMenu.get(3).all(by.css('a')).get(0).getText()).
	        toMatch(headerFourthMenuName);
	    });
	});
	describe('HeaderMenuOnClick', function() {
		
		var headerMenu;

		beforeEach(function() {
			browser.get('http://localhost:8000/#/');
		});

	  	it('should redirect to Home page when clicked on Головна menu option', function(){
			element.all(by.css('.header-navmenu li')).get(0).all(by.css('a')).get(0).click();
			expect(browser.getLocationAbsUrl()).toMatch(headerFirstMenuUrl);
		});
		it('should redirect to Guest-search when clicked on Пошук menu option', function(){
			element.all(by.css('.header-navmenu li')).get(1).all(by.css('a')).get(0).click();
			expect(browser.getLocationAbsUrl()).toMatch(headerSecondMenuUrl);
		});
		it('should redirect to contacts when clicked on Контакти menu option', function(){
			element.all(by.css('.header-navmenu li')).get(2).all(by.css('a')).get(0).click();
			expect(browser.getLocationAbsUrl()).toMatch(headerThirdMenuUrl);
		});
		it('should redirect to statistics when clicked on Статистика menu option', function(){
			element.all(by.css('.header-navmenu li')).get(3).all(by.css('a')).get(0).click();
			expect(browser.getLocationAbsUrl()).toMatch(headerFourthMenuUrl);
		});
		
	});
	describe('Footer', function() {

		browser.get('http://localhost:8000/#/');
		var footMenu = element.all(by.css('.footer-menu li'));
		it('should have menu option named Головна', function() {
	    	expect(footMenu.get(0).all(by.css('a')).get(0).getText()).
	        toMatch(footerFirstMenuName);
	    });
	    it('should have menu option named Про Нас', function() {
	    	expect(footMenu.get(1).all(by.css('a')).get(0).getText()).
	        toMatch(footerSecondMenuName);
	    });
	    it('should have menu option named Контакти', function() {
	    	expect(footMenu.get(2).all(by.css('a')).get(0).getText()).
	        toMatch(footerThirdMenuName);
	    });
	});
	describe('FooterOnClick', function() {

		var footMenu;

		beforeEach(function() {
			browser.get('http://localhost:8000/#/');
			// footMenu = element.all(by.css('.footer-menu li'));
		});
	    it('should redirect to Home page when clicked on Головна footer menu option', function(){
			element.all(by.css('.footer-menu li')).get(0).all(by.css('a')).get(0).click();
			expect(browser.getLocationAbsUrl()).toMatch(footerFirstMenuUrl);
		});
		it('should redirect to About-Us when clicked on Про Нас footer menu option', function(){
			element.all(by.css('.footer-menu li')).get(1).all(by.css('a')).get(0).click();
			expect(browser.getLocationAbsUrl()).toMatch(footerSecondMenuUrl);
		});
		it('should redirect to contacts when clicked on Контакти footer menu option', function(){
			element.all(by.css('.footer-menu li')).get(2).all(by.css('a')).get(0).click();
			expect(browser.getLocationAbsUrl()).toMatch(footerThirdMenuUrl);
		});

	});

	describe('categoriesContainer', function() {


		beforeEach(function() {

    		browser.get('http://localhost:8000/#/');
		});
	
    	it('should be 3 Parent Categories', function() {
			expect(element.all(by.css('.rectangle')).count()).toBe(3);
		});
		it('first parent Category should be Спорт', function() {
			expect(element.all(by.css('.rectangle')).get(0).getText()).toBe(firstParCategory);
		});
		it('second parent Category should be Комп\'ютери', function() {
			expect(element.all(by.css('.rectangle')).get(1).getText()).toBe(secondParCategory);
		});
		it('third parent Category should be Туризм', function() {
			expect(element.all(by.css('.rectangle')).get(2).getText()).toBe(thirdParCategory);
		});
		it('in first parent Category container field "Тест" should be equal to 8', function() {
			expect(element.all(by.css('li .quote-author')).get(0).getText()).toBe(firstParCatContainerTestCount);
		});
		it('in second parent Category container field "Тест" should be equal to 4', function() {
			expect(element.all(by.css('li .quote-author')).get(1).getText()).toBe(secondParCatContainerTestCount);
		});
		it('in third parent Category container field "Тест" should be equal to 1', function() {
			expect(element.all(by.css('li .quote-author')).get(2).getText()).toBe(thirdParCatContainerTestCount);
		});
		it('First parent Category container should have three subcategories', function() {
			expect(element.all(by.css('.categories-container')).get(0).all(by.css('a')).count()).toBe(3);
		});
		it('Second parent Category container should have three subcategories', function() {
			expect(element.all(by.css('.categories-container')).get(1).all(by.css('a')).count()).toBe(3);
		});
		it('Third parent Category container should have three subcategories', function() {
			expect(element.all(by.css('.categories-container')).get(2).all(by.css('a')).count()).toBe(3);
		});
		it('in First parent Category container first subcategory should have name "Футбол"', function() {
			expect(element.all(by.css('.categories-container')).get(0).all(by.css('a')).get(0).getText()).toBe(firstParCatSubCatOne);
		});
		it('in First parent Category container second subcategory should have name "Хокей"', function() {
			expect(element.all(by.css('.categories-container')).get(0).all(by.css('a')).get(1).getText()).toBe(firstParCatSubCatTwo);
		});
		it('in First parent Category container third subcategory should have name "Баскетбол"', function() {
			expect(element.all(by.css('.categories-container')).get(0).all(by.css('a')).get(2).getText()).toBe(firstParCatSubCatThree);
		});
		it('in Second parent Category container first subcategory should have name "Комплектуючі"', function() {
			expect(element.all(by.css('.categories-container')).get(1).all(by.css('a')).get(0).getText()).toBe(secondParCatSubCatOne);
		});
		it('in Second parent Category container second subcategory should have name "Програмування"', function() {
			expect(element.all(by.css('.categories-container')).get(1).all(by.css('a')).get(1).getText()).toBe(secondParCatSubCatTwo);
		});
		it('in Second parent Category container third subcategory should have name "Мережі"', function() {
			expect(element.all(by.css('.categories-container')).get(1).all(by.css('a')).get(2).getText()).toBe(secondParCatSubCatThree);
		});
		it('in Third parent Category container first subcategory should have name "Країни"', function() {
			expect(element.all(by.css('.categories-container')).get(2).all(by.css('a')).get(0).getText()).toBe(thirdParCatSubCatOne);
		});
		it('in Third parent Category container second subcategory should have name "Столиці"', function() {
			expect(element.all(by.css('.categories-container')).get(2).all(by.css('a')).get(1).getText()).toBe(thirdParCatSubCatTwo);
		});
		it('in Third parent Category container third subcategory should have name "Гори"', function() {
			expect(element.all(by.css('.categories-container')).get(2).all(by.css('a')).get(2).getText()).toBe(thirdParCatSubCatThree);
		});
	});

	describe('categoriesContainerClick', function() {

		beforeEach(function() {
    		browser.get('http://localhost:8000/#/');
		});
		it('click on first ParCat should redirect to category page and link should match http://localhost:8000/#/parentcat-page/1', function(){
			element.all(by.css('.rectangle')).get(0).click();
			expect(browser.getLocationAbsUrl()).toMatch(firstParCatUrl);
		});
		it('click on second ParCat should redirect to category page and link should match http://localhost:8000/#/parentcat-page/3', function(){
			element.all(by.css('.rectangle')).get(1).click();
			expect(browser.getLocationAbsUrl()).toMatch(secondParCatUrl);
		});
		it('click on third ParCat should redirect to category page and link should match http://localhost:8000/#/parentcat-page/4', function(){
			element.all(by.css('.rectangle')).get(2).click();
			expect(browser.getLocationAbsUrl()).toMatch(thirdParCatUrl);
		});
		it('in First ParCat click on first subCat should redirect to subcategory page and link should match http://localhost:8000/#/subcategory/2', function(){
			element.all(by.css('.categories-container')).get(0).all(by.css('a')).get(0).click();
			expect(browser.getLocationAbsUrl()).toMatch(firstParCatFirstSubCatUrl);
		});
		it('in First ParCat click on second subCat should redirect to subcategory page and link should match http://localhost:8000/#/subcategory/6', function(){
			element.all(by.css('.categories-container')).get(0).all(by.css('a')).get(1).click();
			expect(browser.getLocationAbsUrl()).toMatch(firstParCatSecondSubCatUrl);
		});
		it('in First ParCat click on third subCat should redirect to subcategory page and link should match http://localhost:8000/#/subcategory/7', function(){
			element.all(by.css('.categories-container')).get(0).all(by.css('a')).get(2).click();
			expect(browser.getLocationAbsUrl()).toMatch(firstParCatThirdSubCatUrl);
		});
		it('in Second ParCat click on first subCat should redirect to subcategory page and link should match http://localhost:8000/#/subcategory/8', function(){
			element.all(by.css('.categories-container')).get(1).all(by.css('a')).get(0).click();
			expect(browser.getLocationAbsUrl()).toMatch(secondParCatFirstSubCatUrl);
		});
		it('in Second ParCat click on second subCat should redirect to subcategory page and link should match http://localhost:8000/#/subcategory/9', function(){
			element.all(by.css('.categories-container')).get(1).all(by.css('a')).get(1).click();
			expect(browser.getLocationAbsUrl()).toMatch(secondParCatSecondSubCatUrl);
		});
		it('in Second ParCat click on third subCat should redirect to subcategory page and link should match http://localhost:8000/#/subcategory/10', function(){
			element.all(by.css('.categories-container')).get(1).all(by.css('a')).get(2).click();
			expect(browser.getLocationAbsUrl()).toMatch(secondParCatThirdSubCatUrl);
		});
		it('in Third ParCat click on first subCat should redirect to subcategory page and link should match http://localhost:8000/#/subcategory/5', function(){
			element.all(by.css('.categories-container')).get(2).all(by.css('a')).get(0).click();
			expect(browser.getLocationAbsUrl()).toMatch(thirdParCatFirstSubCatUrl);
		});
		it('in Third ParCat click on second subCat should redirect to subcategory page and link should match http://localhost:8000/#/subcategory/11', function(){
			element.all(by.css('.categories-container')).get(2).all(by.css('a')).get(1).click();
			expect(browser.getLocationAbsUrl()).toMatch(thirdParCatSecondSubCatUrl);
		});
		it('in Third ParCat click on third subCat should redirect to subcategory page and link should match http://localhost:8000/#/subcategory/12', function(){
			element.all(by.css('.categories-container')).get(2).all(by.css('a')).get(2).click();
			expect(browser.getLocationAbsUrl()).toMatch(thirdParCatThirdSubCatUrl);
		});

	});

});
