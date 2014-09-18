Feature: Administrative Panel, "Бази Даних" category tab
    If I logged not as administrator or moderator I do not have permission to open this page
    If I logged as administrator or moderator 
		I can see this page 
		And I can make a backup copy of database
    
    Scenario: Open Administrative Panel, Tests category Bookmark
        Given I logged in as administrator or moderator
        And I open Administration panel 
        And I open list on tests category bookmark
        When it load 
        Then I see navigation menu of Administration panel with "Бази Даних" as active tab
        And I see a button "Резервне копіювання"