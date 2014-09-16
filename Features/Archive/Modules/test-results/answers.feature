Feature: Correct and wrong answers
	In order to see what analyze test results
    Users want to view which answers were correct and which weren't
    And users shoud learn information about the correct answers

    Scenario: Answer is correct
        Given user passed test
        When program checked user test and certain answer is correct
        Then on green background show question number
        And question content
        And user answer
        And correct answer
        And information about correct answer

    Scenario: Answer is wrong
        Given user passed test
        When program checked user test and certain answer is wrong
        Then on red background show question number
        And question content
        And user answer
        And correct answer
        And information about correct answer
