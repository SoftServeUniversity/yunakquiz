Feature: Test results heading
	In order to see what test was passed
    Users want to view test results heading with test name in it
    And view category and subcategory under test name

    Scenario: Test results heading is shown
        Given user passed test
        When program checked user test
        Then on green background test results heading "Тест <testName>" in bold format is shown
        And category "з категорії <category> підкатегорії <subcategory>" in italic format is shown
