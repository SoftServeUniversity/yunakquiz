'use strict';

describe('AdminPanel', function(){

    var ptor =  protractor.getInstance();
    var mockModule = require('../mocked-backend.js');
    var adminPanel = 
    [{tabName: "Користувачі", url: "http://localhost:8000/#/administration-panel/"},
     {tabName: "Чорний список", url: "http://localhost:8000/#/administration-panel/blacklistTab"},
     {tabName: "Адміністрація", url: "http://localhost:8000/#/administration-panel/administrationTab"},
     {tabName: "Категорії тестів", url: "http://localhost:8000/#/administration-panel/quizzescategoriesTab"},
     {tabName: "Про нас", url: "http://localhost:8000/#/administration-panel/aboutusTab"},
     {tabName: "Часті запитання", url: "http://localhost:8000/#/administration-panel/faqTab"}
    ]
    var tabsCount = 6;
      ptor.addMockModule('httpBackendMock', mockModule.httpBackendMock);
      var adminPanelTabs = element.all(by.css('.admin-panel-tabs li'));

    beforeEach(function() {
        ptor.addMockModule('httpBackendMock', mockModule.httpBackendMock);
        browser.get('http://localhost:8000/#/administration-panel/'); 
    });

    describe('AdminPanelTabElements', function() {
      browser.get('http://localhost:8000/#/administration-panel/'); 
      var adminTitleElement = element(by.css('.pageTitle')).getText();

      function adminPanTabNameCheck(){
        adminPanel.forEach(function(tab, index){
          expect(adminPanelTabs.get(index).getText())
          .toMatch(tab.tabName);
        });
      }  
        
      it('should have admin panel title ', function() {
        expect(adminTitleElement).toMatch(adminPanel.title);
      });
      it('all tabs should have cooresponding names', function() {
        adminPanTabNameCheck();
      });
    });

    describe('AdminPanelTabClick', function() {
      function adminPanTabClickCheck(){
        adminPanel.forEach(function(tab, index){
          adminPanelTabs.get(index).click();
          expect(browser.getLocationAbsUrl()).toMatch(tab.url);
        });
      }
      beforeEach(function() {
        browser.get('http://localhost:8000/#/administration-panel/');
      });

      it('should be six Tabs', function(){
        expect(adminPanelTabs.count()).toMatch(tabsCount);
      });

      it('every click on any of tabs should redirect to coresponding tab', function(){
        adminPanTabClickCheck();
      });
    });
    
});
