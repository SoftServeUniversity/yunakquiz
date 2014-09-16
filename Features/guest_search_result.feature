Feature: Search enine for tests 
    You can search for some key in all test that are on site
    From this page you can open advanced search page
    You don't need to be logged in, it's same search for all users

    Scenario: General view of page 
        Given I open guest search page
        Then I see guest search page with header
        And name of my user or "Log In" button 
        And site navigation menu 
        And I see name of current page "Guest Search"
        And text input form with "Search" button
        And button "Extended search"
        And in the bottom of page i see footer menu
    
    Scenario: Search keyword 
        Given I enter keyword in text input
        And press "Search" button
        Then I see list of test where my keyword is found
        
    Scenario: View of search results
        Given I enter keyword in text input  
        And press "Search" button
        Then I see list rectangle
        And in rectangle there is name of test
        And summary about test 
        And in the bottom of rectangular there is tags 
        And under all of rectangulars there is a numbers of pages
        
    
        
    
        
        