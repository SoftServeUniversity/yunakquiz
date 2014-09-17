Feature: Page where I can look through the test, edit it (q/a, category etc ), 
	 make moderators notes, publish it in my category or send it for revision.

    Scenario:

	Given I see a field which is called "Теги" 
	When I click on input field
	And write a tag name
	And put enter
	Then there should appeared tag with our name with opportunity to delete it.
	And I can add other one tag in this field.

    Scenarion: have a test with current name

	Given test with three questions and three answers for each of them
	When I click on the answer 
	Then I can edit the answer
	And it will be saved

    Scenario:

	Given test description
	When I click on the field with description 
	Then I can edit it and save

    Scenarion:

	Given green button "Опублікувати тест"
	When I click on this button
	Then I publish this test
	And test will be added to moderator's cabinet

    Scenario:

	Given red button "Відмінити перегляд"
	When I click on
	Then write an appropriate comment
	And return to moderator's cabinet

    Scenario:

	Given an appropriate comment
	When a comment is present
	Then button "Опублікувати тест" is unavailable

    Scenario:

	Given comments field
	When I click on input field
	And write my comment
	And click button "Повернути"
	Then I return to moderator's cabinet

    Scenario:

	Given drop-down list with categories of tests
	When I choose the category
	Then in another drop-down list will appeared the subcategories of current category.