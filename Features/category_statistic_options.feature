Feature: category statistic options

    Scenario:
	
	Given there are and option list and tabs
	When I click on option lists
		|Вік		|
		|Ступінь	|
		|Від		|
		|До			|
	And I click on "Згенерувати графік" button
	Then I should have to see a graph or a table
		
    Scenario:

	Given "Вік" option
	When I click on
	And if "Бали/Вік" tab is selected
	Then I will have a graph of time and age of all tests
	
	Scenario:

	Given "Ступінь" option
	When I click on
	And if "Бали/Ступінь" tab is selected
	Then I will have a graph of time and stage of all tests
	
	Scenario:

	Given "Від" and "До" options
	When I click on
	Then I will see a pop-up calendar
	And I will choose a date

