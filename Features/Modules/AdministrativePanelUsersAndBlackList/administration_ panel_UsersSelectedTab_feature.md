**Feature:** Administration panel in selected User tab on which user logined as administrator can navigate through menus and make changes to user accounts |change status|add to blacklist|delete user also administrator can change sorting methods and use build in serch function

**Scenario:** Logined as administrator user click BlackList Tab

**Given:** Administrator panel application with user dataBase

**When:** User clicks on Blacklist Tab

**Then:** User redirected to BlackList Tab 

<br>
**Scenario:** Logined as administrator user click Administration Tab

**Given:** Administrator panel application with user dataBase and BlackList 

**When:** User clicks on Administration Tab

**Then:** User redirected to Administration Tab

<br>
**Scenario:** Logined as administrator user click category Tab

**Given:** Administrator panel application with user dataBase

**When:** User clicks on Category Tab

**Then:** User redirected to Category Tab

<br>
**Scenario:** Logined as administrator user click DataBase Tab

**Given:** Administrator panel application with user dataBase

**When:** User clicks on DataBases Tab

**Then:** User redirected to DataBases Tab

<br>
**Scenario:** Logined as administrator user click Localization Tab

**Given:** Administrator panel application with user dataBase

**When:** User clicks on Localization Tab

**Then:** User redirected to Localization Tab

<br>
**Scenario:** Logined as administrator user click AboutUs Tab

**Given:** Administrator panel application with user AboutUs

**When:** User clicks on AboutUs Tab

**Then:** User redirected to AboutUs Tab

<br>
**Scenario:** Logined as administrator user click FAQ Tab

**Given:** Administrator panel application with user dataBase

**When:** User clicks on FAQ Tab

**Then:** User redirected to FAQ Tab

<br>
**Scenario:** Logined as administrator user changes sort metods to by email

**Given:** Administrator panel application with user dataBase

**When:** User change sort methods to by email

**Then:** List of users sorted by email

<br>
**Scenario:** Logined as administrator user changes sort methods to alphabetic

**Given:** Administrator panel application with user dataBase

**When:** User change sort methods to by alphabetic

**Then:** List of users sorted by alphabetic

<br>
**Scenario:** Logined as administrator user click add to BlackList button

**Given:** Administrator panel application with user dataBase

**When:** User clicks add to Blacklist any User

**Then:** Run function button\_banned\_users passing to this function Id of user 

**Then** Confirmation modal form is opened

<br>
**Scenario:** Logined as administrator user click delete user button

**Given:** Administrator panel application with user dataBase

**When:** User clicks delete user 

**Then:** Run function button\_delete\_user passing to this function Id of user 

**Then** Confirmation modal form is opened

<br>
**Scenario:** Logined as administrator user click change user status button

**Given:** Administrator panel application with user dataBase

**When:** User clicks change user status 

**Then:** Run function changestatus passing to this function Id of user 

**Then** Confirmation modal form is opened

<br>
**Scenario:** Success on delete user 

**Given:** user Id to delete

**Then:** User with given Id removed from list and database

<br>
**Scenario:** Success on change user status 

**Given:** user Id and status to change 

**Then:** User with given Id changes status to given status

**And:** User list updated with new settings

<br>
**Scenario:** Success on add user to BlackList 

**Given:** user Id to add in Blacklist

**Then:** User with given Id addet to BlackList

**And:** User list updated with new settings

