Feature: Test results page
In order to learn about test results
As a user I want to view test name, category and subcategory
And I want to view my score
And my correct and wrong answers
And learn information about correct answers

   Scenario: Test results appearance
        Given user passed test
        When program checked user test
        Then I should see heading "Тест <testName>"
        And category "з категорії <category> підкатегорії <subcategory>"
        And I should see score shown in format "Твій вислід: <userScore> зі <maxScore> балів!"
        And under it, I should see scorebar that dynamically fills from left to right showing test score proportionally in green and red colors(correct to wrong)
        And I should see list of blocks of correct or wrong answers
        And I should see "Пройти тест заново!" pass test again button
    
    Scenario: Answer is correct
        Given user passed test
        When program checked user test and certain answer is correct
        Then I should see on green background question number
        And question content
        And user answer
        And correct answer
        And information about correct answer

    Scenario: Answer is wrong
        Given user passed test
        When program checked user test and certain answer is wrong
        Then I should see on red background question number
        And question content
        And user answer
        And correct answer
        And information about correct answer

    Scenario: User clicks on pass test again button
        Given green "Пройти тест заново!" button
        When I click on pass test again button
        Then I should be directed to pass this certain test again
