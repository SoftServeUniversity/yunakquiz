Feature: Confirmed test management
    Page with ability to filter through all tests by categories etc. in order to edit them, change its category etc.

    Scenario: Switching through categories

       Given I see a list of categories 
	When I click on some category
	Then I should see a list of it's sub-categories
	 And I can enter sub-category page by clicking sub-category name
         And I should see all the tests of that category

    Scenarion: Editing test

       Given I am on some sub-category page
         And I can see a list of test's titles
	When I click on some of titles
	Then I am redirected to test editing page
	 And I can make changes to the test
         And I can save this changes clicking on "Зберегти зміни" button

    Scenario: Changing test's category

       Given I am on some sub-category page
         And I can see a list of test's titles
	When I click on some of titles
	Then I am redirected to test editing page
	 And I can see test's category and subcategory, which are selected in drop-down lists
         And I can change test's category and subcategory changing values of drop-down lists
         And I can save changes by ckicking "Зберегти зміни" button

  