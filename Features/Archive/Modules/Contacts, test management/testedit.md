   Feature: Editing the test
     Page with ability to filter through all tests by categories etc. in order to edit them, change its category etc.
 
     Scenario: Editing categories
        Given I am logged in as administrator or moderator
          And I am on confirmed tests management page
         When I choose one of tests
         Then I should be able to edit it or change it's category

