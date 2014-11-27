'use strict';

describe('contactPage', function () {

  var ptor =  protractor.getInstance();
  var mockModule = require('../mocked-backend.js');
  var contactPageTitle = 'Контакти';
  var contacts = 
    [{role: 'Адміністратор',address: '79000, Fedkovycha Str. 60A, building 1',mail:'someone@somemail.com',phone: '+38 032 244-44-44'},
     {role: 'Модератор',address: '79000, Fedkovycha Str. 60A, building 1',mail:'someone@somemail.com',phone: '+38 032 244-44-44'},
     {role: 'Ще хтось',address: '79000, Fedkovycha Str. 60A, building 1',mail:'someone@somemail.com',phone: '+38 032 244-44-44'}
    ];
  var contactsCount = 3;

  beforeEach(function () {
    ptor.addMockModule('httpBackendMock', mockModule.httpBackendMock);
    browser.get('http://localhost:8000/#/contacts'); 
   });

  describe('contactMainInfoPresense', function () {
    function checkContactsTitle() {
      var contactsTitle = element.all(by.css('.pageTitle')).getText();

      expect(contactsTitle).toMatch(contactPageTitle);
    };
    function checkContactBlock() {
      var contactsBlocksOnPage = element.all(by.repeater('person in contacts')).count(); 
      expect(contactsBlocksOnPage).toBe(contactsCount);
    };

    function check(elementToCheck) {
      contacts.forEach(function (contact,index) {
      expect(element.all(by.binding('person.'+ elementToCheck +'')).get(index).getText())
      .toBe(contact[elementToCheck]);  
      })
    };
    it('should have page title "Контакти"', function () {
      checkContactsTitle();
    }); 
    it('should be 3 contacts block', function () {
      checkContactBlock();
    });
    it('all contacts name should have correct names', function () {
      check('role');
    });
    it('all contacts should have corresponding addresses"', function () {
      check('address');
    });
    it('all contacts should have corresponding emails"', function () {
      check('mail');
    });
    it('all contacts should have corresponding phones', function () {
      check('phone');
    });
  });
});
