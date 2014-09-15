Feature: FAQ
    In order not to bother admins/moderators with freaquently asked question
    Users want to view answers to freaquently asked question

    FAQ should have white "Часті Питання" heading of blue background
    FAQ should have list of freaquently asked questions
    If question was clicked on - answer appears below this question and it becomes red
    If clicked question was clicked again - answer hides and question text becomes again black from red 

    Scenario: Show answer to certain question
        Given there is question in FAQ
        When user click on question
        Then question should be colored to red
        And answer text to this question should appear below it

    Scenario: Hide answer to certain question
        Given there is question that was clicked before
        And answer to this question below it
        When user click on red question
        Then question should be colored to black
        And answer text to this question should be hidden
