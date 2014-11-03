'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('Signup page', function() {
    var httpBackendMock = function() {
        angular.module('httpBackendMock', ['yunakQuiz', 'ngMockE2E']).run(function($httpBackend) {
         var user = {username: 'Inokentiy', password: '12345678', password_confirmation: '12345678', email: 'ewrrg@fgfgf', birthday: '2014-10-08'};
         var userok = {username: 'Igoryan', password: '12345678', password_confirmation: '12345678', email: 'ewrrg@fgfgf', birthday: '2014-10-08'};
         // $httpBackend.whenPOST("http://localhost:9292/register")
          $httpBackend.whenPOST('http://localhost:9292/register', user).respond(function(method, url, data, headers) {
            console.log('Received these data:', method, url, data, headers);
            return [400, {"username":"has already been taken"}, {}];
          });

          $httpBackend.whenPOST('http://localhost:9292/register', userok).respond(function(method, url, data, headers) {
            console.log('Hohoho lucky motherfucker', method, url, data, headers);
            return [200, "ok", {}];
          });
         // .respond([400, {"username":"has already been taken"}]);
         // $httpBackend.whenGET(/modules\/\w+.*/).passThrough();
         $httpBackend.whenGET(/^\w+.*/).passThrough();
         //$httpBackend.whenGET().passThrough()
        });
    };
    var ptor =  protractor.getInstance();
    //var mockModule = require('../mocked-backend.js');
    ptor.addMockModule('httpBackendMock', httpBackendMock);


  beforeEach(function() {
      browser.get('http://localhost:8000/#/auth/signup');
      //ptor.addMockModule('httpBackendMock', mockModule.httpBackendMock);
    });

  it('should redirect to the Main page when we click cancel botton', function() {
      element(by.css('[ng-click="reg.cancel()"]')).click();
      expect(browser.getLocationAbsUrl()).toMatch("/");
    });

  describe('Incorrect registration', function() {

    it('should display error message when we submit empty fields', function() {
        element(by.buttonText('Реєстрація')).click();
        expect(element(by.css('[name=username]+div')).getText()).toBe('Please input a username');
        expect(element(by.css('[name=password]+div')).getText()).toBe('Please input a password');
        expect(element(by.css('[name=email]+div')).getText()).toBe('Please input your email');
        expect(element(by.css('[name=birthday]+div')).getText()).toBe('Please input your birthday');
    });

    it('should display error message when we input a short username', function() {
        element(by.css('[name=username]')).sendKeys("qq");
        expect(element(by.css('[name=username]+div')).getText()).toBe('Your username is required to be at least 3 characters');
    });

    it('should display error message when we input a short password', function() {
        element(by.css('[name=password]')).sendKeys("qq");
        expect(element(by.css('[name=password]+div')).getText()).toBe('Your password is required to be at least 8 characters');
    });

    it('should display error message when password confirmation is fail', function() {
        element(by.css('[name=password]')).sendKeys("12345678");
        element(by.css('[name=password_confirmation]')).sendKeys("1234567");
        expect(element(by.css('[name=password_confirmation]+small')).getText()).toBe("Passwords don't match!");
    });

    it('should display error message when we input a invalid birthday', function() {
        element(by.css('[name=birthday]')).sendKeys("1215");
        element(by.buttonText('Реєстрація')).click();
        expect(element(by.css('[name=birthday]+div')).getText()).toBe("Please input your birthday");
    });

    it('should display error message when Username has already been taken', function() {
        var captcha = element(by.binding('reg.captcha')).getText()
        element(by.css('[name=email]')).sendKeys("ewrrg@fgfgf");
        element(by.css('[name=username]')).sendKeys("Inokentiy");
        element(by.css('[name=password]')).sendKeys("12345678");[]
        element(by.css('[name=password_confirmation]')).sendKeys("12345678");
        element(by.css('[name=birthday]')).sendKeys("10082014");
        element(by.model('reg.enteredCaptcha')).sendKeys(captcha);
        element(by.buttonText('Реєстрація')).click();
        //ptor.sleep(50000);
        expect(element(by.css('[name=username]+div')).getText()).toBe("Username has already been taken");
    });

        it('should display error message when Username has already been taken', function() {
        var captcha = element(by.binding('reg.captcha')).getText()
        element(by.css('[name=email]')).sendKeys("ewrrg@fgfgf");
        element(by.css('[name=username]')).sendKeys("Igoryan");
        element(by.css('[name=password]')).sendKeys("12345678");[]
        element(by.css('[name=password_confirmation]')).sendKeys("12345678");
        element(by.css('[name=birthday]')).sendKeys("10082014");
        element(by.model('reg.enteredCaptcha')).sendKeys(captcha);
        element(by.buttonText('Реєстрація')).click();
        ptor.sleep(50000);
        expect(element(by.css('[name=username]+div')).getText()).toBe("Username has already been taken");
    });

  });

});