'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('Login Model Window', function() {

  it('should open model window', function() {
    browser.get('http://localhost:8000/');
    element(by.css('.login-header-menu')).click();
    browser.sleep(1000);
    expect(element(by.id('login')).isDisplayed()).toBe(true);
    //expect(element(by.id('login')).getAttribute('class')).toBe('modal fade in');
  });

  describe('Functionality of MLW', function() {

    beforeEach(function() {
      browser.get('http://localhost:8000/');
      element(by.css('.login-header-menu')).click();
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
        element(by.model('lgn.user.username')).sendKeys("tfilonych");
        element(by.model('lgn.user.password')).sendKeys("11111111");
        element(by.buttonText('Увійти')).click();
        browser.sleep(1000);
        expect(element(by.id('login')).isDisplayed()).toBe(false);
        expect(element(by.binding('appCtrl.username')).getText()).toBe("tfilonych");
      });

    });

    describe('Login with incorrect data', function() {

      it('should display error message "Invalid username and/or password!"', function() {
        element(by.model('lgn.user.username')).sendKeys("azazaza");
        element(by.model('lgn.user.password')).sendKeys("11111111111");
        element(by.buttonText('Увійти')).click();
        expect(element(by.binding('lgn.message')).getText()).toBe("Invalid username and/or password!");
      });

      it('should display error message "Enter username and password!"', function() {
        element(by.buttonText('Увійти')).click();
        expect(element(by.binding('lgn.message')).getText()).toBe("Enter username and password!");
      });

    });


  });
});