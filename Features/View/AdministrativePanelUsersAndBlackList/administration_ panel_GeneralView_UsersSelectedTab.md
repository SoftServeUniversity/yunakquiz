**Feature:** Administration panel on which user logined as administrator can navigate through menus and make changes

**Scenario:** Visiting administration panel

**Given:** Administration panel and user database with more than 10 users

**When:** I visit administration panel

**Then:** I should see Title block named System of plastic electronic questionnaire

**And:** I should see Header-menu with submenu items
|HomePage|Search|Contacts|Statistics

**And:** I should see Key-Picture 

**And:** I should see Panel Title named administation panel

**And:** I should see Navigation Tab Panel with 8 tabs named Users|BlackList|Administration|TestsCategories|DataBases|Localization|AboutUs|FAQ and first tab named Users should be active

**And:** I should see text Sort By and next to the text select tab with default option Alpahabetic 

**And:** I should see input field with hint Search

**And:** I should see list of first ten users in database sorted by defaults alphabetical each with 3 aditional tabs containing |Username|email|status and 3 buttons named change status|add to blacklist|delete 

**And:** I should see additional navigation tab which can have two or more aditional tabs named by numerical 1|2|3 etc

**And:** I should see Panel with 3 tabs named HomePage|AboutUs|Contacts

**And:** I should see Text Copyright 2014 IF-044