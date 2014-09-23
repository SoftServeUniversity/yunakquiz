Feature: Assessment editing feature
     In order work with assesments
     As a user
     I want to be able to edit my own assessment

    Scenario: Assessment edititng page view
	Given I open assessment editing page
        Then I see  header  "Редагування тесту"
        And input form with assessment name input
        And assessment description input
        And tags input
        And drop-down list of assessment category 
        And drop-down list of assessment subcategory
        And input form for assessment question
        And in the end of input i see "Delete assessment" button
        And explanation to assessment input
        And answer for assessment and in the end of input there is "Right answer" button and "Delete answer" button
        And another answer and in the end of input there is "Right answer" button and "Delete answer" button 
        And "Add Answer" button 
        And "Add question" button
        And "Save as drafts" button and "Send for the moderation" button
        And in the bottom of page i see footer menu
    
    
    Scenario: Sending new test for moderator with filling all fields
        Given filled all fields 
        When push button "Send to moderator"
        Then you will be relocated to user cabinet
        
    Scenario: Sending new test for moderator without filling all fields
        Given filled not all fields
        When push button "Send to moderator"
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
        When I push "Save as draft"
        Then I see my cabinet page
        
    Scenario: Saving test to drafts without filling all fields 
        Given filled not all fields
        When I push "Save as draft"
        Then I see my cabinet page