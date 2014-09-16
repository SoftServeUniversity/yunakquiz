Feature: Home page
	
	In order to load
	As a guest
	Should be able to visit our web site

	Scenario: The application has a home page
	
		Given I do have a web application
		When I visit the home page
		Then I should see the home page
		And I should see navigation menu
		And I should see login button
		And I should see list of categories and subcategories
	
	Scenario: 
	
		Given I am on homepage as guest
		When I click on login button
		Then I should see pop-up login form 
		
Feature: Navigation menu

	As a guest I need to see menu with four items

	Scenario:

		Given there is a menu
		When I see menu
		Then I see items:
			|Головна    |
			|Пошук      |
			|Контакти   |  
			|Статистика | 
	
	Scenario:

		Given there is menu that contains "Головна"
		When I click on "Головна"
		Then I should see Home page
	
	Scenario:

		Given there is menu that contains "Пошук"
		When I click on "Пошук"
		Then I should see Search page	
		
	Scenario:

		Given there is menu that contains "Контакти"
		When I click on "Контакти"
		Then I should see Contacts page	
		
	Scenario:

		Given there is menu that contains "Статистика"
		When I click on "Статистика"
		Then I should see Statistic page		
		
Feature: Categories list


	As a guest I need to see list of categories
	
	Scenario:
	
		Given there is list of categories
		When I click on category
		Then I should see a proper category page
	
	