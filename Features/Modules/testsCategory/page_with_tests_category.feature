Feature: Categories list

    As a guest I need to see list of categories
	
    Scenario:
	
	Given there is list of three categories:
		| Спорт      |
		| Туризм     |
		| Комп'ютери |
	When I click on one of the categories
	Then I should see subcategories of certain category