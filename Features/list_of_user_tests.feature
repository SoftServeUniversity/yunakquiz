	Feature: List of user's tests 
  	As a user I need to see tests moderation status, 
  	get into statistics page of them, edit any test, 
  	filter through my tests, 
  	delete them and press add test button.

  
  
  	Scenario Outline: "List of user's tests" page 
    Given user on the "Головна" page
    When I click on "User name" icon
	And I click on "Особистий кабінет"
    Then I get to "List of user's tests" page
    And page's title is "Особистий кабінет Name Surname"
    And page contains "Search field", "Додати новий тест" button
	And page also contains list of user tests <status> sheets and "Мій профіль" sheet,
	And each <status> contains <information> about tests
	Examples:
	|status			|information	|
	|Опубліковані	|Назва тесту	|
	|Недоопрацьовані|Категорія		|
	|Незатверджені	|Підкатегорія	|
	|Створені		|				|
	

	Scenario: Search field view
    Given Search field contains input field and search button with loupe pictogram
    When  I input name of sought-for test
	And click on search button
    Then I can see search results of tests with required name
	
	
    
  	Scenario: "Додати новий тест" button
    Given "Додати новий тест" button
    When  I click on "Додати новий тест" button
    Then I go to "Створення тесту" page for creating new tests

	
	Scenario: "Опубліковані" status
    Given "Опубліковані" sheet of List of user's tests
    When  I click on "Опубліковані" sheet
    Then I can see list of tests with publish status
	
	Scenario: "Недоопрацьовані" status
    Given "Недоопрацьовані" sheet of List of user's tests
    When  I click on "Недоопрацьовані" sheet
    Then I can see list of tests with unfinished status
	
	Scenario: "Незатверджені" status
    Given "Незатверджені" sheet of List of user's tests
    When  I click on "Незатверджені" sheet
    Then I can see list of tests with unconfirmed status
	
	
	Scenario: "Створені" status
    Given "Створені" sheet of List of user's tests
    When  I click on "Створені" sheet
    Then I can see list of tests with status of created 

  