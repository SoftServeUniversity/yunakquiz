Feature: Advanced search page
    You can search keyword in category that you can choose 
    You can choose more than two categories to search in 
    You don't need to be logged in, it's same search for all users
    I can see all test in category without keyword
    
    Scenarion: General view 
        Given I open advanced search page
        Then I see advanced search page with header
        And name of my user or "Log In" button 
        And site navigation menu 
        And block of category filters with button "Use filter"
        And text input form with "Search" button
        And I see list rectangle
        And in rectangle there is name of test
        And summary about test 
        And in the bottom of rectangular there is tags 
        And under all of rectangulars there is a numbers of pages
        And in the bottom of page i see footer menu

    Scenario: Search test with choosen category and keyword
        Given keyword
        And choosen category to search in
        And press button "Use filter"
        And press button "Search"
        Then I see a list of test with searched keyword in it
        
    Scenario: Search test with choosen category
        Given choosen category to search in
        And press button "Use filter"
        And press button "Search"
        Then I see a list of test with searched category in it
        