	Feature: Subcategory page with ability to find specific test
  	As a guest I need to see search results of subcategory tests, 
  	and to be able to find specific test 
  	using search and using alphabet or date filter.
  
  
 	Scenario: Subcategory page 
    Given guest on the "Category" page
    When I click "Subcategory" link
    Then I get to "Subcategory" page
    And page's title is "Пошук тестів у Subcategory name"
    And page contains "Filer field", "Search field", "Page-selector of results "

    
  	Scenario: Filter field view
    Given Filter field contains "Сортування по" and drop-down list
    When  I click drop-down list
    Then I can see two drop-down options
	|Даті|
	|Алфівіту|
	
	Scenario: Filter field option "Даті"
    Given Filter field "Сортування по" and option "Даті"
    When  I click option "Даті"
    Then I can see sort results of subcategory tests sorted by creation date
	
	Scenario: Filter field option "Алфівіту"
    Given Filter field "Сортування по" and option "Алфівіту"
    When  I click option "Алфівіту"
    Then I can see sort results of subcategory tests sorted by alphabet
	
	Scenario: Search field view
    Given Search field contains input field and search button with loupe pictogram
    When  I input name of sought-for test
	And click on search button
    Then I can see search results of tests with required name
	

  Scenario: List of search results view
    Given list of subcategory search results
    When I see list of search results
    Then I can see list of blocks of subcategory tests contains
	|Name of test|
	|Description of test|

  Scenario: Name of test - link
    Given Name of subcategory test
    When I click on link of name of test
    Then I open page where I can take a test 
    
 
  Scenario Outline: View of page-selector of results 
    Given page-selector of results contains <page> buttons
	When I click <page> button
    Then I can see a <page> of search results
	Examples:
		|<<|
		|1|
		|2|
		|3|
		|4|
		|>>|
  