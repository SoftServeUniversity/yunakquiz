Feature: Administrative Panel, Tests category Bookmark
    If i logged as a authorised user i do not have permission to open this page
    I can see this page only if i logged as administrator or moderator
    I can add or remove test categories 
    And i can add test category
    
    
    Scenario: Open Administrative Panel, Tests category Bookmark
        Given i logged in as administrator or moderator
        And i open Administration panel 
        And i open list on tests category bookmark
        When it load 
        Then i see name of site
        And name of my user
        And site navigation menu
        And navigation menu of Administration panel with tests category as active bookmark 
        And descending list of tests category with "Add new category" button  
        |№ number| |Category name| |Parentness category| |"Edit category" button| |"Delete category" button|
        And in the bottom of page i see footer menu
        
    Scenario: Open Administration panel, Tests category Bookmark as an user without administration privileges
        Given i logged in as authorised user without administration privileges
        When i enter the administration panel
        Then i see 404 page
        
     Scenario: Changing administrator status to moderator
        Given i push on button "Change status" 
        When i see pop-up with information about user which i want to change status
        And drop-down list where i can choose new status of user 
        And captcha with text input 
        And "Yes", "No" buttons
        And i choose moderator status from drop-down list
        And enter number from captcha to text input 
        And push "Yes" button
        Then i see moderator status on list of administration and moderator privileges users
        
    Scenario: Add new test category
        Given i logged in as administrator or moderator 
        And i push "Add new test category" button
        When i see pop-up with form with Category name and drop-down list for Parentness category
        And captcha
        And "Yes", "No" buttons
        And i enter name for Category name, and choose Parentness category
        And fill capthca 
        And press "Yes" button
        Then i see new category that i have been created already in a descending list
        
    Scenario: Edit test category
        Given i logged in as administrator or moderator 
        And i push "Add new test category" button
        When i see pop-up with form and Category name and drop-down list for Parentness category
        And captcha
        And "Yes", "No" buttons
        And i change Category name or Parentness category
        And press "Yes" button
        Then i see test category list with test category that i have been just changed 
        And test category has new Category name or new Parentness category
    
    Scenario: Remove test category
        Given i logged in as administrator or moderator 
        And i push "Delete test category" button
        When i see pop-up with  Test category information (Category, Parentness category)
        And  "Yes", "No" buttons
        And press "Yes" button
        Then i see test category list without category that i have been just deleted
        