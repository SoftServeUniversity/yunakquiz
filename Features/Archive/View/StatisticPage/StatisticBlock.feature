Feature: View statistic  block 
    In order to view statistic 
    I want to see statistics 

Scenario: Opening statistic page and scores tab
    Given I visit statistic page 
    When I open scores/age tab
    Then I should see keyword "Вік"
    And I should see list of four items
    And I should see keyword "Від"
    And I should see input field
    And I should see keyword "До"
    And I should see input field
    And I should see button
    And I should see statistic menu with items |"Тести"|"Бали"|"Бали/Вік"|"Бали/Ступінь"|"Кількість спроб"|"Середній бал"|
    And I item "Бали/Ступінь" should active
    And I should see block with a graph


Scenario: Opening statistic page and scores tab
    Given I visit statistic page 
    When I open scores tab
    Then I should see keyword "Від"
    And I should see input field
    And I should see keyword "До"
    And I should see input field
    And I should see button
    And I should see statistic menu with items |"Тести"|"Бали"|"Бали/Вік"|"Бали/Ступінь"|"Кількість спроб"|"Середній бал"|
    And I item "Бали" should active
    And I should see block with a graph
