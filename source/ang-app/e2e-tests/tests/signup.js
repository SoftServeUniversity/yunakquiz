'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('Signup page', function() {
  beforeEach(function() {
      browser.get('http://localhost:8000/#/auth/signup');
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

    // it('should display error message when you enter invalid email', function() {
    //     element(by.css('[name=email]')).sendKeys("ewrrg@fgfgf");
    //     element(by.css('[name=username]')).sendKeys("Inokentiy");
    //     ment(by.css('[name=password]')).sendKeys("12345678");
    //     element(by.css('[name=password_confirmation]')).sendKeys("12345678");
    //     expect(element(by.css('[name=email]+div')).getText()).toBe("That is not a valid email. Please input a valid email.");
    // });

  });

});