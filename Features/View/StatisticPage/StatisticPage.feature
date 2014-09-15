Feature: View statistic page
    In order to view statistic of scores
    I want to see statistics page

Scenario: Opening statistic page as User
    Given I visit statistic page and I`m  logged in
    When I open statistic page
    Then I should see title of the page
    And I should see Navigation menu
    And I should see user name
    And I should see title "Загальна статистика системи"
    And I should see statistic block
    And I should see footer menu
    And I should see copyright text

Scenario: Opening statistic page as Guest
    Given I visit statistic page and I`m not logged in
    When I open statistic page
    Then I should see title of the page
    And I should see Navigation menu
    And I should see icon for login page
    And I should see title "Загальна статистика системи"
    And I should see statistic block
    And I should see footer menu
    And I should see copyright text
