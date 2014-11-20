'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('UsersTab', function() {
  var httpBackendMock = function() {
        angular.module('httpBackendMock', ['yunakQuiz', 'ngMockE2E']).run(function($httpBackend) {
         var outputDataFirstPage={
              currentPage: 1,
              itemsPerPage: 10,
              searchData:'',
              status: 'enabled',
              roles: 2
            };
          var outputDataSecondPage={
              currentPage: 2,
              itemsPerPage: 10,
              searchData:'',
              status: 'enabled',
              roles: 2
            };
          var firstPageUsersResponse = {"users":[{"id":3,"username":"user1235","first_name":"Тарас","last_name":"Кіцмей","email":"user3@mail.com","role_id":2,"status":"enabled"},{"id":5,"username":"user1237","first_name":"Тарас","last_name":"Кіцмей","email":"user5@mail.com","role_id":2,"status":"enabled"},{"id":6,"username":"user1238","first_name":"Тарас","last_name":"Кіцмей","email":"user6@mail.com","role_id":2,"status":"enabled"},{"id":7,"username":"user1239","first_name":"Тарас","last_name":"Кіцмей","email":"user7@mail.com","role_id":2,"status":"enabled"},{"id":8,"username":"user12331","first_name":"Тарас","last_name":"Кіцмей","email":"user8@mail.com","role_id":2,"status":"enabled"},{"id":9,"username":"user12332","first_name":"Тарас","last_name":"Кіцмей","email":"user9@mail.com","role_id":2,"status":"enabled"},{"id":10,"username":"user12333","first_name":"Тарас","last_name":"Кіцмей","email":"user22@mail.com","role_id":2,"status":"enabled"},{"id":11,"username":"user12334","first_name":"Тарас","last_name":"Кіцмей","email":"user23@mail.com","role_id":2,"status":"enabled"},{"id":12,"username":"user12335","first_name":"Тарас","last_name":"Кіцмей","email":"user24@mail.com","role_id":2,"status":"enabled"},{"id":13,"username":"user12336","first_name":"Тарас","last_name":"Кіцмей","email":"user25@mail.com","role_id":2,"status":"enabled"}],"totalItems":13}
          var secondPageUsersResponse = {"users":[{"id":14,"username":"user123333","first_name":"Тарас","last_name":"Кіцмей","email":"user222@mail.com","role_id":2,"status":"enabled"},{"id":15,"username":"user123343","first_name":"Тарас","last_name":"Кіцмей","email":"user232@mail.com","role_id":2,"status":"enabled"},{"id":16,"username":"user123353","first_name":"Тарас","last_name":"Кіцмей","email":"user242@mail.com","role_id":2,"status":"enabled"}],"totalItems":13}
          

          $httpBackend.whenPOST('http://localhost:9292/admin/users', outputDataFirstPage).respond(function(method, url, data, headers) {
            console.log('Received these data:', method, url, data, headers);
            return [200, firstPageUsersResponse, {}];
          });

          $httpBackend.whenPOST('http://localhost:9292/admin/users', outputDataSecondPage).respond(function(method, url, data, headers) {
            console.log('Sorry this is not your day', method, url, data, headers);
            return [200, secondPageUsersResponse, {}];
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

  describe('Paginations tests', function() {

    beforeEach(function() {
      ptor.addMockModule('httpBackendMock', httpBackendMock);
      browser.get('http://localhost:8000/#/administration-panel/');
      browser.sleep(1000);
    });


    it('it shoud display 10 users', function() {
      expect(element.all(by.repeater('user in users')).count()).toBe(10);
    });

    it('it shoud display 3 users', function() {
      element(by.cssContainingText('[ng-click="selectPage(page.number)"]', '2')).click();
      expect(element.all(by.repeater('user in users')).count()).toBe(3);
    });


    // it('should redirect to signup page, after click on signup button', function() {
    //     //element(by.buttonText('Зареєструватись')).click();
    //     element(by.css('[ng-click="selectPage(page.number)"]')).click();
    //     expect(browser.getLocationAbsUrl()).toMatch("/auth/signup");
    // });

    // describe('Login with correct data', function() {

    //   it('should close modal window and show name of user', function() {
    //     element(by.model('lgn.user.username')).sendKeys("qwerty");
    //     element(by.model('lgn.user.password')).sendKeys("12345678");
    //     element(by.buttonText('Увійти')).click();
    //     browser.sleep(1000);
    //     expect(element(by.id('login')).isDisplayed()).toBe(false);
    //     expect(element(by.binding('appCtrl.user.username')).getText()).toBe("qwerty");
    //   });

    // });

    // describe('Login with incorrect data', function() {

    //   it('should display error message "Invalid username and/or password!" when we submit wrong password', function() {
    //     element(by.model('lgn.user.username')).sendKeys("qwerty");
    //     element(by.model('lgn.user.password')).sendKeys("11111111");
    //     element(by.buttonText('Увійти')).click();
    //     expect(element(by.binding('lgn.message')).getText()).toBe("Не валідний нік і/або пароль!");
    //   });

    //   it('should display error message "Invalid username and/or password!" when we submit wrong username', function() {
    //     element(by.model('lgn.user.username')).sendKeys("azazaza");
    //     element(by.model('lgn.user.password')).sendKeys("12345678");
    //     element(by.buttonText('Увійти')).click();
    //     expect(element(by.binding('lgn.message')).getText()).toBe("Не валідний нік і/або пароль!");
    //   });

    //   it('should display error message "Enter username and password!"', function() {
    //     element(by.buttonText('Увійти')).click();
    //     expect(element(by.binding('lgn.message')).getText()).toBe("Введіть нікнейм і пароль!");
    //   });

    // });


  });
});