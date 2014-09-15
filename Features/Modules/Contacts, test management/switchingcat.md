Feature: Switching categories in confirmed tests management
   Page with ability to filter through all tests by categories etc. in order to edit them, change its category etc.

   Scenario: Switching categories
     Given I am logged in as administrator or moderator
       And I am on Confirmed tests management page
       And I should see list of categories, input field and search button
      When I click on some category
      Then I should see a list of tests of that category

   Scenari: Swithing to empty category
     Given When I swith to category
       And Catgory is empty
      Then I shoud see a message that category is empty
     