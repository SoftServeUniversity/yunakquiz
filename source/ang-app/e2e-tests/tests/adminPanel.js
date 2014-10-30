'use strict';

describe('AdminPanel', function(){

	var ptor =  protractor.getInstance();
	var mockModule = require('../mocked-backend.js');
	var adminPanel = 
					{title: "Адміністративна панель",
					 userTab: "Користувачі",
					 blackListTab: "Чорний список",
					 administrationTab:"Адміністрація",
					 quizCategoriesTab:"Категорії тестів",
					 aboutUsTab:"Про нас",
					 faqTab:"Часті питання",
					 UsersTabUrl:"http://localhost:8000/#/administration-panel/",
					 blackListTabUrl:"http://localhost:8000/#/administration-panel/blacklistTab",
					 administrationTabUrl:"http://localhost:8000/#/administration-panel/administrationTab",
					 quizzCategoriesTabUrl:"http://localhost:8000/#/administration-panel/quizzescategoriesTab",
					 aboutusTabTabUrl:"http://localhost:8000/#/administration-panel/aboutusTab",
					 faqTabUrl:"http://localhost:8000/#/administration-panel/faqTab",
					 tabsCount:6
					};

	beforeEach(function() {
    	ptor.addMockModule('httpBackendMock', mockModule.httpBackendMock);
    	browser.get('http://localhost:8000/#/administration-panel/'); 
	});

	describe('AdminPanelTabElements', function() {
		var adminPanelTabs = element.all(by.css('.admin-panel-tabs li'));
		
		// browser.get('http://localhost:8000/#/administration-panel/');

	    it('should have admin panel title ', function() {
	    	expect(element(by.css('.pageTitleBox')).getText()).
	        toMatch(adminPanel.title);
	    });
	    it('should have tab named "Користувачі"', function() {
	    	expect(adminPanelTabs.get(0).getText()).
	        toMatch(adminPanel.userTab);
	    });
	    it('should have tab named "Чорний список"', function() {
	    	expect(adminPanelTabs.get(1).getText()).
	        toMatch(adminPanel.blackListTab);
	    });
	    it('should have tab named "Адміністрація"', function() {
	    	expect(adminPanelTabs.get(2).getText()).
	        toMatch(adminPanel.administrationTab);
	    });
	    it('should have tab named "Категорії тестів"', function() {
	    	expect(adminPanelTabs.get(3).getText()).
	        toMatch(adminPanel.quizCategoriesTab);
	    });
	    it('should have tab named "Про нас"', function() {
	    	expect(adminPanelTabs.get(4).getText()).
	        toMatch(adminPanel.aboutUsTab);
	    });
	    it('should have tab named "Часті питання"', function() {
	    	expect(adminPanelTabs.get(5).getText()).
	        toMatch(adminPanel.faqTab);
	    });
	});

	describe('AdminPanelTabClick', function() {
		var adminPanelTabs = element.all(by.css('.admin-panel-tabs li'));

		beforeEach(function() {
			browser.get('http://localhost:8000/#/administration-panel/');
		});

		it('should be six Tabs', function(){
			expect(adminPanelTabs.count()).toMatch(adminPanel.tabsCount);
		});

	  	it('when clicked on "Користувачі" Tab redirect to "http://localhost:8000/#/administration-panel/"', function(){
			adminPanelTabs.get(0).click();
			expect(browser.getLocationAbsUrl()).toMatch(adminPanel.UsersTabUrl);
		});
		it('when clicked on "Чорний список" Tab redirect to "http://localhost:8000/#/administration-panel/blacklistTab"', function(){
			adminPanelTabs.get(1).click();
			expect(browser.getLocationAbsUrl()).toMatch(adminPanel.blackListTabUrl);
		});
		it('when clicked on "Адміністрація" Tab redirect to "http://localhost:8000/#/administration-panel/administrationTab"', function(){
			adminPanelTabs.get(2).click();
			expect(browser.getLocationAbsUrl()).toMatch(adminPanel.administrationTabUrl);
		});
		it('when clicked on "Категорії тестів" Tab redirect to "http://localhost:8000/#/administration-panel/quizzescategoriesTab"', function(){
			adminPanelTabs.get(3).click();
			expect(browser.getLocationAbsUrl()).toMatch(adminPanel.quizzCategoriesTabUrl);
		});
		it('when clicked on "Про нас" Tab redirect to "http://localhost:8000/#/administration-panel/aboutusTab"', function(){
			adminPanelTabs.get(4).click();
			expect(browser.getLocationAbsUrl()).toMatch(adminPanel.aboutusTabTabUrl);
		});
		it('when clicked on "Часті питання" Tab redirect to "http://localhost:8000/#/administration-panel/faqTab"', function(){
			adminPanelTabs.get(5).click();
			expect(browser.getLocationAbsUrl()).toMatch(adminPanel.faqTabUrl);
		});
	});
	
});
