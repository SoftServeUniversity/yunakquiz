'use strict';
describe('AdminPanel', function() {

  var ptor =  protractor.getInstance();
  var mockModule = require('../mocked-backend.js');
  var aboutUsMatch = 'ABOUT US WORKS';
  var startUrl = 'http://localhost:8000/#/administration-panel/aboutusTab';
  
  var toolBarsButtons = 
    [
     'fa-bold',
     'fa-italic',
     'fa-underline',
     'fa-strikethrough',
     'fa-list-ul',
     'fa-list-ol',
     'fa-repeat',
     'fa-undo',
     'fa-ban',
     'fa-align-left',
     'fa-align-center',
     'fa-align-right',
     'fa-indent',
     'fa-outdent',
     'fa-picture-o',
     'fa-link',
     'about-us-read-btn',
     'btn-success',
     'btn-default'
    ];
    var buttons = 
    [{selector : 'btn-success', msg: 'Зміни збережено'},
     {selector : 'about-us-read-btn', msg: 'Зміни відхилено'}
    ];

  function adminPanAboutUrl() {
    browser.get(startUrl);
  };

  function checkButtonsPresence(){
    toolBarsButtons.forEach(function (currentButton) {
      expect(element(by.className(currentButton)).isPresent()).toBe(true);
    });
  };
  function checkSaveCancelButton() {
    buttons.forEach(function (button) {
      element(by.className(button.selector)).click();
      expect(element(by.binding('msg')).getText()).toMatch(button.msg);
    })
  }

  beforeEach(function () {
    ptor.addMockModule('httpBackendMock', mockModule.httpBackendMock);
    adminPanAboutUrl(); 
  });

  describe('Admin panel AboutUsPage', function () {
    
    it('All buttons present', function () {
      checkButtonsPresence();
    });
    it('Check Save/Cancel function', function () {
      checkSaveCancelButton();
    });
  });
});
