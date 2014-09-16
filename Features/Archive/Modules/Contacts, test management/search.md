  Feature: Search in confirmed text managemet

   Scenario: Clicking search button 
     Given When I type something in searh input field
       And I click a search button
      Then I should see all tests in accordance to my search text

   Scenario: Clicking search button (when input is empty)
     Given When I click a search button
       And Search input field is empty
      Then I should see a message, that search input is empty
   
   Scenario: Clicking search button (when there's no search results)
     Given When I Click a search button
       And There are no search results
      Then I should see a message, that nothing was found