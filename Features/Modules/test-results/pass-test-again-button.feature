Feature: Pass test again button
	In order to improve score on this certain test
    Users want to pass this certain test again 

    Scenario: User hovers/focuse on pass test again button
        Given green "Пройти тест заново!" button
        When user hovers/focuse on on button
        Then button color becomes a little bit darker

    Scenario: User clicks on pass test again button
        Given green "Пройти тест заново!" button
        When user clicks on button
        Then user directed to pass this certain test again
