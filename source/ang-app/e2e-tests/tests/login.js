'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

xdescribe('Login Model Window', function() {
  var httpBackendMock = function() {
        angular.module('httpBackendMock', ['yunakQuiz', 'ngMockE2E']).run(function($httpBackend) {
          var successfulLoginRespose = {"id":2,"username":"qwerty","first_name":null,"last_name":null,"hashed_password":"3294a196c78a08bbc9fe7cf26788ca2c387926d0a60e0eacd153b75551eb3b18","salt":"b397bef7c4fd2cfd069a949c9ac15d992f6116459cf3126a06f445decdc79fd2","email":"edlert@rambler.ru","birthday":"2014-10-28T00:00:00.000Z","plast_hovel":null,"plast_region":null,"plast_level":null,"picture":null,"created_at":"2014-11-04T00:51:57.504Z","updated_at":"2014-11-04T00:51:57.504Z"};
          var userIgoryan = {username: 'Igoryan', password: '12345678', password_confirmation: '12345678', email: 'ewrrg@fgfgf.com', birthday: '2014-10-08'};

          $httpBackend.whenPOST('http://localhost:9292/access', {username: "qwerty", password: "12345678"}).respond(function(method, url, data, headers) {
            console.log('Received these data:', method, url, data, headers);
            return [200, successfulLoginRespose, {}];
          });

          $httpBackend.whenPOST('http://localhost:9292/access', {username: "qwerty", password: "11111111"}).respond(function(method, url, data, headers) {
            console.log('Sorry this is not your day', method, url, data, headers);
            return [401, "unauthorized", {}];
          });

          $httpBackend.whenPOST('http://localhost:9292/access', {username: "azazaza", password: "12345678"}).respond(function(method, url, data, headers) {
            console.log('Sorry this is not your day', method, url, data, headers);
            return [401, "unauthorized", {}];
          });

         $httpBackend.whenGET(/modules\/\w+.*/).passThrough();
         $httpBackend.whenGET(/^\w+.*/).passThrough();
         $httpBackend.whenGET().passThrough();
        });
    };
    var ptor =  protractor.getInstance();
    //var mockModule = require('../mocked-backend.js');
    ptor.addMockModule('httpBackendMock', httpBackendMock);

  it('should open model window', function() {
    browser.get('http://localhost:8000/');
    element(by.css('.login-header-menu')).click();
    browser.sleep(1000);
    expect(element(by.id('login')).isDisplayed()).toBe(true);
    //expect(element(by.id('login')).getAttribute('class')).toBe('modal fade in');
  });

  describe('Functionality of MLW', function() {

    beforeEach(function() {
      ptor.addMockModule('httpBackendMock', httpBackendMock);
      browser.get('http://localhost:8000/');
      element(by.css('.login-header-menu')).click();
      browser.sleep(1000);
    });

    it('should render four buttons', function() {
      expect(element(by.model('lgn.user.username')).isPresent()).toBe(true);
      expect(element(by.model('lgn.user.password')).isPresent()).toBe(true);
      expect(element(by.css('.pull-left')).isPresent()).toBe(true);
      expect(element(by.css('.btn-primary')).isPresent()).toBe(true);
    });

    it('should redirect to signup page, after click on signup button', function() {
        //element(by.buttonText('Зареєструватись')).click();
        element(by.css('[ng-click="lgn.register()"]')).click();
        expect(browser.getLocationAbsUrl()).toMatch("/auth/signup");
    });

    describe('Login with correct data', function() {

      it('should close modal window and show name of user', function() {
        element(by.model('lgn.user.username')).sendKeys("qwerty");
        element(by.model('lgn.user.password')).sendKeys("12345678");
        element(by.buttonText('Увійти')).click();
        browser.sleep(1000);
        expect(element(by.id('login')).isDisplayed()).toBe(false);
        expect(element(by.binding('appCtrl.user.username')).getText()).toBe("qwerty");
      });

    });

    describe('Login with incorrect data', function() {

      it('should display error message "Invalid username and/or password!" when we submit wrong password', function() {
        element(by.model('lgn.user.username')).sendKeys("qwerty");
        element(by.model('lgn.user.password')).sendKeys("11111111");
        element(by.buttonText('Увійти')).click();
        expect(element(by.binding('lgn.message')).getText()).toBeTruthy();
      });

      it('should display error message "Invalid username and/or password!" when we submit wrong username', function() {
        element(by.model('lgn.user.username')).sendKeys("azazaza");
        element(by.model('lgn.user.password')).sendKeys("12345678");
        element(by.buttonText('Увійти')).click();
        expect(element(by.binding('lgn.message')).getText()).toBeTruthy();
      });

      it('should display error message "Enter username and password!"', function() {
        element(by.buttonText('Увійти')).click();
        expect(element(by.binding('lgn.message')).getText()).toBeTruthy();
      });

    });


  });
});