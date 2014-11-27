'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('Signup page', function() {
    var httpBackendMock = function() {
        angular.module('httpBackendMock', ['yunakQuiz', 'ngMockE2E']).run(function($httpBackend) {
          var userInokentiy = {username: 'Inokentiy', password: '12345678', password_confirmation: '12345678', email: 'ewrrg@fgfgf.com', birthday: '2014-10-07T21:00:00.000Z'};
          var userIgoryan = {username: 'Igoryan', password: '12345678', password_confirmation: '12345678', email: 'ewrrg@fgfgf.com', birthday: '2014-10-07T21:00:00.000Z'};
          var permission = ["adminUsersTab", "adminBlackListTab", "adminAdministrationTab", "adminModeratorsTab", "adminCategoriesTab", "adminAboutUsTab", "adminFAQ"];

          $httpBackend.whenPOST('http://localhost:9292/user', userInokentiy).respond(function(method, url, data, headers) {
            console.log('Received these data:', method, url, data, headers);
            return [400, {"username":["has already been taken"]}, {}];
          });

          $httpBackend.whenPOST('http://localhost:9292/user', userIgoryan).respond(function(method, url, data, headers) {
            console.log('Hohoho you are lucky', method, url, data, headers);
            return [200, "ok", {}];
          });
          $httpBackend.whenGET('http://localhost:9292/permission').respond(permission);
          $httpBackend.whenGET(/modules\/\w+.*/).passThrough();
          $httpBackend.whenGET(/^\w+.*/).passThrough();
          $httpBackend.whenGET().passThrough();
        });
    };
    var ptor =  protractor.getInstance();
    //var mockModule = require('../mocked-backend.js');
    ptor.addMockModule('httpBackendMock', httpBackendMock);

  beforeEach(function() {
      browser.get('http://localhost:8000/#/auth/signup');
      //ptor.addMockModule('httpBackendMock', httpBackendMock);
    });

  it('should redirect to the Main page when we click cancel botton', function() {
      element(by.css('[ng-click="reg.cancel()"]')).click();
      expect(browser.getLocationAbsUrl()).toMatch("/");
    });

  describe('Incorrect registration', function() {

    it('should display error message when we submit empty fields', function() {
        element(by.buttonText('Реєстрація')).click();
        expect(element(by.css('[name=username]+div')).getText()).toBe("Будь-ласка, введіть нік");
        expect(element(by.css('[name=password]+div')).getText()).toBe("Будь-ласка, введіть пароль");
        expect(element(by.css('[name=email]+div')).getText()).toBe("Будь-ласка, введіть електронну адресу");
        expect(element(by.css('[name=birthday]+div')).getText()).toBe("Будь-ласка, введіть день народження");
    });

    it('should display error message when we input a short username', function() {
        element(by.css('[name=username]')).sendKeys("qq");
        expect(element(by.css('[name=username]+div')).getText()).toBe("Довжина нікнейма повинна становити принаймі 3 символи");
    });

    it('should display error message when we input a short password', function() {
        element(by.css('[name=password]')).sendKeys("qq");
        expect(element(by.css('[name=password]+div')).getText()).toBe("Довжина пароля повинна становити принаймі 8 символів");
    });

    it('should display error message when password confirmation is fail', function() {
        element(by.css('[name=password]')).sendKeys("12345678");
        element(by.css('[name=password_confirmation]')).sendKeys("1234567");
        expect(element(by.css('[name=password_confirmation]+div')).getText()).toBe("Підтвердження пароля не співпадає!");
    });

    it('should display error message when we input a invalid birthday', function() {
        element(by.css('[name=birthday]')).sendKeys("1215");
        element(by.buttonText('Реєстрація')).click();
        expect(element(by.css('[name=birthday]+div')).getText()).toBe("Будь-ласка, введіть день народження");
    });

    it('should display error message when Username has already been taken', function() {
        var captcha = element(by.binding('reg.captcha')).getText()
        element(by.css('[name=email]')).sendKeys("ewrrg@fgfgf.com");
        element(by.css('[name=username]')).sendKeys("Inokentiy");
        element(by.css('[name=password]')).sendKeys("12345678");[]
        element(by.css('[name=password_confirmation]')).sendKeys("12345678");
        element(by.css('[name=birthday]')).sendKeys("10082014");
        element(by.model('reg.enteredCaptcha')).sendKeys(captcha);
        element(by.buttonText('Реєстрація')).click();
        //ptor.sleep(30000);
        expect(element(by.css('[name=username]+div')).getText()).toBe("Користувач з таким іменем вже існує");
    });

      it('should redirect to Main page when registration is successful', function() {
      var captcha = element(by.binding('reg.captcha')).getText()
      element(by.css('[name=email]')).sendKeys("ewrrg@fgfgf.com");
      element(by.css('[name=username]')).sendKeys("Igoryan");
      element(by.css('[name=password]')).sendKeys("12345678");
      element(by.css('[name=password_confirmation]')).sendKeys("12345678");
      element(by.css('[name=birthday]')).sendKeys("10082014");
      element(by.model('reg.enteredCaptcha')).sendKeys(captcha);
      element(by.buttonText('Реєстрація')).click();
      // ptor.sleep(30000);
      expect(browser.getLocationAbsUrl()).toMatch("/");
    });

  });

});