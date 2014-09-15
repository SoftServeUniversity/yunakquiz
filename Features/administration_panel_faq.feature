Feature: Administration panel, tab FAQ
  As an Administrator I need to be able to 
  add new question and new answer for it,
  edit text of existing question and text of existing answer
  
  Scenario: FAQ page appearance
    Given admin on a admin panel 
    When I click on FAQ tab of the administration panel
    Then I see list of existing questions and answers
    And I see "Add" button
 
  Scenario: Question edit controls appearance
    Given admin on a admin panel, tab FAQ 
    When I click on the question text
    Then I see "save", "cancel changes", "delete question" buttons
    And input field with populated current question value 
    
  Scenario: Answers edit controls appearance
    Given admin on a admin panel, tab FAQ 
    When I click on the answer text
    Then I see "save", "cancel changes", "delete question" buttons
    And input field with populated current answer value   
 
  Scenario: Edit text of the question
    Given admin on a admin panel, tab FAQ 
    When I click on the question text
    And I change the value of the "question" input field
    And I press the button "save"
    Then new question is saved
    And edit question controls disappear
    
  Scenario: Cancel entering changes of the question field
    Given admin on a admin panel, tab FAQ 
    When I click on the question text
    And I change the value of the "question" input field
    And I press the button "cancel changes"
    Then new question isn't changed
    
  Scenario: Delete question
    Given admin on a admin panel, tab FAQ 
    When I click on the question text
    And I press the button "delete question"
    And I press the "ok" button in appeared alert box
    Then the question is deleted
    
  Scenario: Edit answer
    Given admin on a admin panel, tab FAQ 
    When I click on the answer text
    And I change the value of the "answer" input field
    And I press "save" button
    Then new answer is saved
    And edit answer controls disappear
    
  Scenario: Cancel entering changes of the answer field
    Given admin on a admin panel, tab FAQ 
    When I click on the answer text
    And I change the value of the "answer" input field
    And I press "cancel changes" button
    Then new answer isn't changed
    
  Scenario: Add new question
    Given admin on a admin panel, tab FAQ 
    When I click on "add" button
    Then I see new question/answer editable template form

