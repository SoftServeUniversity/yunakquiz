'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('my app', function() {

  browser.get('index.html');

  it('should automatically redirect to /measures when location hash/fragment is empty', function() {
    expect(browser.getLocationAbsUrl()).toMatch("/measures");
  });


  describe('measures', function() {

    beforeEach(function() {
      browser.get('index.html#/measures');
    });


    it('should render measures when user navigates to /measures', function() {
      expect(element.all(by.css('[ng-view] p')).first().getText()).
        toMatch(/partial for view 1/);
    });

  });


  describe('assessments', function() {

    beforeEach(function() {
      browser.get('index.html#/assessments');
    });


    it('should render assessments when user navigates to /assessments', function() {
      expect(element.all(by.css('[ng-view] p')).first().getText()).
        toMatch(/partial for view 2/);
    });

  });
});
