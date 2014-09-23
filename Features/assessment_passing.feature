Feature: Pass test
	In order to pass test
	As an guest or user
	I want to see page with test

Scenario: Page of test view
	Given I have test in database
	When I go to the page of test
	Then I should see title of the test
	And I should see  breadcrumbs
	And I should see one or more questions 
	And I should see answers
	And I shoul see button for passing test

Scenario: Breadcrumbs view
	Given I have test in category "Спорт" and subcategory "Футбол"
	When I go to the page of test
	Then I should see link "Спорт" 
	And  I should see link  "Футбол"

Scenario: Breadcrumbs category action
	Given I have test  in category "Спорт" and subcategory "Футбол"
	When I click on the link "Спорт" 
	Then I should see page of "Спорт" category

Scenario: Breadcrumbs subcategory action
	Given I have test  in category "Спорт" and subcategory "Футбол"
	When I click on the link "Футбол" 
	Then I should see page of "Футбол" subcategory

Scenario: Mark answers normal
	Given I have not highlighted question with unmarked answer
	When I click on the answer
	Then Answer is marked


Scenario: Mark answers in highlighted question
	Given I have highlighted question with unmarked answer
	When I click on the answer
	Then Answer is marked
	And question is not highlighted

Scenario: Unmark answers
	Given I have question with marked answer 
	When I click on the answer
	Then Answer is unmarked

Scenario: Pass test with marked questions 
	Given I have test width at least one answer marked in each  question
	When I click on the pass test button
	Then I should see page width test results

Scenario: Pass test with unmarked questions 
	Given I have test witdh at least one question without marked answer
	When I click on the pass test button
	Then I should see question without marked answer highlihted