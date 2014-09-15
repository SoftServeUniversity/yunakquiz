Feature: Administration panel, administration bookmark
    If i logged as a authorised user i do not have permission to open this page
    I can see this page only if i logged as administrator
    I can add or remove administration privileges for accounts
    And i can remove account
    
    
    Scenario: Open Administration panel, administration bookmark as an administrator 
        Given i logged in as administrator 
        And i open Administration panel 
        And i open list of administration bookmark
        When it load 
        Then i see name of site
        And name of my user
        And site navigation menu
        And navigation menu of Administration panel with administration as active bookmark 
        And list of administration and moderator privileges users and all their information 
        |Name of user| |Email of user| |Status| |"Change status" button| |"Delete user" button|
        And in the bottom of page i see footer menu
        
    Scenario: Open Administration panel, administration bookmark as an user without administration privileges
        Given i logged in as authorised user without administration privileges
        When i enter the administration panel
        Then i see 404 page
        
     Scenario: Changing administrator status to moderator
        Given i logged in as administrator
        And i push on button "Change status"
        When i see pop-up with information about user which i want to change status
        And drop-down list where i can choose new status of user 
        And captcha with text input 
        And "Yes", "No" buttons
        And i choose moderator status from drop-down list
        And enter number from captcha to text input 
        And push "Yes" button
        Then i see moderator status on list of administration and moderator privileges users
        
    Scenario: Changing moderator  status to administrator
        Given i logged in as administrator
        And i push on button "Change status"
        When i see pop-up with information about user which i want to change status
        And drop-down list where i can choose new status of user 
        And captcha with text input 
        And "Yes", "No" buttons
        And i choose administrator status from drop-down list
        And enter number from captcha to text input 
        And push "Yes" button
        Then i see administrator status on list of administration and moderator privileges users
        
    Scenario: Changing moderator or administrator status to authorised user
        Given i located on Administration panel, list of administration bookmark
        And i logged in as administrator
        And i push on button "Change status" 
        When i see pop-up with information about user which i want to change status
        And drop-down list where i can choose new status of user 
        And captcha with text input 
        And "Yes", "No" buttons
        And i choose authorised user status from drop-down list
        And enter number from captcha to text input 
        And push "Yes" button
        Then i don't see authorised user status on list of administration and moderator privileges users
        
    Scenario: Deleting users accounts
        Given i located on Administration panel, list of administration bookmark
        And i logged in as administrator
        And i push on button delete
        When i see pop-up with information about user which i want to delete
        And captcha with text input 
        And "Yes", "No" buttons
        And i enter number from captcha to text input 
        And push "Yes" button 
        Then i see administration panel, list of administration bookmark without user that i deleted
        