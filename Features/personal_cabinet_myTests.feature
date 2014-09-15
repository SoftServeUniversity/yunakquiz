Feature: Personal cabinet
	In order to see the status  of my tests
	As a user
	I want to see the list  of my tests

	Background:
    Given I sign in as "Tolik"
    When I go to the users Personal cabinet page

	Scenario: Published tests
	    And I click on "Опубліковані"
	    Then I should see the list of my published tests in table:
	    | Назва тесту    | Категорія             | Підкатегорія     |
		
	Scenario: Unfinished tests
	    And I click on "Недопрацьовані"
	    Then I should see the list of my unfinished tests in table:
	     | Назва тесту    | Категорія             | Підкатегорія    |

	Scenario: Unapproved tests
	    And I click on "Незатверджені"
	    Then I should see the list of my Unapproved tests in table:
	     | Назва тесту    | Категорія             | Підкатегорія    |

	Scenario: Сreated tests
	    And I click on "Створені"
	    Then I should see the list of all my created tests in table:
	     | Назва тесту    | Категорія             | Підкатегорія    |
