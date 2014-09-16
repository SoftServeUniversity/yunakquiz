Feature: Score
	In order to see what score users get on passing test
    Users want to view their score

    Scenario: Score is shown
        Given user passed test
        When program checked user test
        Then user score shown in format "Твій вислід: <userScore> зі <maxScore> балів!" in green text color
        And under it, scorebar dynamically fills from left to right showing test score proportionally in green and red colors(correct to wrong)
