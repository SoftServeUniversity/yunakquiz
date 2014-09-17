 Feature: Contacts
   A page with administrator's and moderators contact information

   Scenario: Communicating with administration (logged in as a user)
     Given I am logged in as a user
       And I should see administration's contact information and "send message" buttons
      When I click on "send message" button
      Then I should be able to type my message
       And it should be delivered to appropriate moderator.
 
   Scenario: Communicating with administration (not logged in)
     Given I am not logged in
      When I am on contacts page
      Then I shouldn't be able to see "send message" buttons
       And There should be a notification, that I must be logged in in order to contact administration

   Scenario: Editing contact information
      Given: I am logged in as administrator
       When: I am on contacts page
       Then: I should be able to add, edit and delete contact info
