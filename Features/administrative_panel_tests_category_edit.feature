Feature: Administrative Panel, "Категорії тестів" tab
    If I logged not as administrator or moderator I do not have permission to open this page
    If I logged as administrator or moderator 
        I can add or remove test categories 
		And I can edit existing test category
    
    
    Scenario: Open Administrative Panel, "Категорії тестів" tab
        Given I logged in as administrator or moderator
        And I open Administration panel 
        And I open list on test categories
        When it load 
        Then I see a list of test categories with buttons 
			|"редагувати"	|
        	|"скасувати"	|
		And I see a button "Додати категорію"
		
        
    Scenario: Open Administration panel, Tests category Bookmark as an user without administration privileges
        Given I logged in no as administrator or moderator
        When I enter the administration panel
        Then I see 404 page
        
    Scenario: Clicking on "редагувати" button
        Given a list of test categories with buttons and "додати категорію" button
		When I push on button "редагувати"   
		I see pop-up with information about category which I want to edit
        And input for getting a category's name
        And drop-down of existing categories for getting a parent category
		And captcha with text input 
        And "редагувати категорію", "скасувати" buttons
		
	Scenario: Renaming existing category
	    Given a pop-up with information about category which I want to edit
		When I enter a name to input
		And click on "редагувати" button
		And enter a captcha number
		Then pop up closes
		And category has a new name

	Scenario: Changing subcategory tree
		Given a pop-up with information about category which I want to edit
		When I choose a named category from drop-down
		And click on "редагувати" button
		And enter a captcha number
		Then pop up closes
		And category gets new parent category
	
	Scenario: Changing category tree
		Given a pop-up with information about category which I want to edit
		When I choose a "-------"
		And click on "редагувати" button
		And enter a captcha number
		Then pop up closes
		And category becomes a category
		
    Scenario: Clicking on "видалити" button
		Given a list of test categories with buttons 
		When I push on button "видалити"   
		I see pop-up with captha and buttons 		
			|"видалити"		|
        	|"скасувати"	|
    
	Scenario: Deleting category
		Given a pop-up with captha and buttons
		When I click a "видалити" button
		And enter captcha number
		Then pop up closes
		And category deletes
		
    Scenario: Clicking on "додати категорію" button
        Given a list of test categories with buttons and "додати категорію" button
		When I push on button "додати категорію"
		I see pop-up with information about category which I want to add
        And input for getting a new category's name
        And drop-down of existing categories for getting a parent category
		And captcha with text input 
        And "додати категорію", "скасувати" buttons

	Scenario: Add new subcategory
		Given a pop-up with information about category which I want to add
		When I choose a named category from drop-down
		And click on "додати категорію" button
		And enter a captcha number
		Then pop up closes
		And new subcategory adds
	
	Scenario: Add new category
		Given a pop-up with information about category which I want to add
		When I choose a "-------"
		And click on "додати категорію" button
		And enter a captcha number
		Then pop up closes
		And new category adds