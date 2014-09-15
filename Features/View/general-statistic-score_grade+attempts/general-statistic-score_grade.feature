Feature: Score/grade statistics page
    In order to learn about score/grade statistics
    User want to view score/grade statistics page
    
    Scenario: View score/grade statistics page
        Given User directed to score/grade statistics page
        When User opened score/grade statistics page
        Then user should see "Система Пластових електронних опитників" title
        And user should see navigation menu
        And user should see login status block
        And user should see "Загальна статистика системи" page title
        And user should see score/grade statistics module
        And user should see footer menu with copyright info