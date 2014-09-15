Feature: Sport category

    Scenario:
	
	Given there is a list of three subcategories
	When I click on one of these subcategories 
	Then I should have an opportunity to choose one of the tests of this category:
		| Баскетбол |
		| Хокей     |
		| Футбол    |

    Scenario:

	Given first subcategory "Баскетбол"
	When I click on
	Then I will have a list of 5 tests:
		| Правила дорожнього руху1 |
		| Highway code             |
		| Правила дорожнього руху2 |
		| Правила дорожнього руху3 |
		| Правила дорожнього руху4 |
	And I can pass any test 

    Scenario:

	Given second subcategory "Хокей"
	When I click on
	Then I will have a list of 17 tests:
		| Правила дорожнього руху1  |
		| Highway code              |
		| Правила дорожнього руху2  |
		| Правила дорожнього руху3  |
		| Правила дорожнього руху4  |
		| Правила дорожнього руху5  |
		| Правила дорожнього руху6  |
		| Правила дорожнього руху7  |
		| Правила дорожнього руху8  |
		| Правила дорожнього руху9  |
		| Правила дорожнього руху10 |
		| Правила дорожнього руху11 |
		| Правила дорожнього руху12 |
		| Правила дорожнього руху13 |
		| Test0                     |
		| Test1                     |
		| Test2                     |
	And I can pass any test 

    Scenario:

	Given third subcategory "Футбол"
	When I click on
	Then I will have a list of 3 tests:
		| Правила дорожнього руху1 |
		| Highway code             |
		| Правила дорожнього руху2 |
	And I can pass any test 