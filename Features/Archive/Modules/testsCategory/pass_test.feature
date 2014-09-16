Feature: Passing the test
    As a user 
    I have to be able to pass a test
 
Scenario: Mark answers 
    Given Page with test is opened
    When I click on the answer
    Then Answer turns green

Scenario: Pass test with no answers marked

    Given Page with test is opened and no answers are marked
    When I press button "Пройти тест"
    Then Questions with no answers marked wiil be highlighted


Scenario: Pass test with marked answers

    Given Page with test is opened and at least one answer in every question is marked
    When I press button "Пройти тест"
    Then I should see page with test results
