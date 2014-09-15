Feature: Computers category

    Scenario:
	
	Given there is a list of three subcategories
	When I click on one of these subcategories 
	Then I should have an opportunity to choose one of the tests of this category:
		| підкатегорія |
		| підкатегорія |
		| підкатегорія |

    Scenario:

	Given first subcategory "Баскетбол"
	When I click on
	Then I will have a list of 3 tests:
		| Правила дорожнього руху1 |
		| Highway code             |
		| Правила дорожнього руху2 |
	And I can pass any test 

    Scenario:

	Given second subcategory "Хокей"
	When I click on
	Then I will have a list of 4 tests:
		| Правила дорожнього руху1  |
		| Highway code              |
		| Правила дорожнього руху2  |
		| Правила дорожнього руху3  |
	And I can pass any test 

    Scenario:

	Given third subcategory "Футбол"
	When I click on
	Then I will have a list of 2 tests:
		| Правила дорожнього руху1 |
		| Highway code             |
	And I can pass any test 