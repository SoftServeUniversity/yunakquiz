Feature: Creating of new test page
    I can access this page if I logged in as an authorised user
    Test can not been added without fiiling up all forms
    Every question must have at least one answer
    
    Scenario: General view of page
        Given I open test creation page
        Then I see test creation page with header
        And name of my user 
        And site navigation menu 
        And I see name of current page "Test creation"
        And input form with test name input
        And test description input
        And tags input
        And drop-down list of test category 
        And drop-down list of test subcategory
        And input form for test question
        And in the end of input i see "Delete test" button
        And explanation to test input
        And answer for test and in the end of input there is "Right answer" button and "Delete answer" button
        And another answer and in the end of input there is "Right answer" button and "Delete answer" button 
        And "Add Answer" button 
        And "Add question" button
        And "Save as drafts" button and "Send for the moderation" button
        And in the bottom of page i see footer menu
    
    Scenario: Sending new test for moderator with filling all fields
        Given filled all fields 
        And push button "Send to moderator"
        Then you will be relocated to user cabinet
        
    Scenario: Sending new test for moderator without filling all fields
        Given filled not all fields
        And push button "Send to moderator"
        Then fields that were not filled will have red border
        
    Scenario: Adding new question to the test
        Given push button "Add new question" 
        Then I see new form for question under old one
        
     Scenario: Removing question from the test
        Given push button "Remove test"   
        Then I don't see form for question
        
    Scenario: Choosing right answer for question
        Given I push the "Right answer" button on the answer field 
        Then I see green checkmark near field
        
    Scenario: Adding answer for question
        Given I push "Add answer" button
        Then I see new answer field under the old one
        
    Scenario: Removing answer for question
        Given I push "Remove answer" button
        Then that answer is deleted from field
        
    Scenario: Saving test to drafts with filling all fields 
        Given I fill all fields in the test
        And I push "Save as draft"
        Then I see my cabinet page
        
    Scenario: Saving test to drafts without filling all fields 
        Given filled not all fields
        And I push "Save as draft"
        Then fields that were not filled will have red border