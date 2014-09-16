**Feature:** Moderator Personal Page With Unchecked Test Tab User can navigate click on lists tabs etc also can check unchecked tests use filter 

**Scenario:** Visiting moderator page on Unchecked tests Tab Using filters

**Given:** moderator application with DataBase 

**When:** User clicks on Highlighted text Search everywhere

**Then:** Resets Filter

**And:** User clicks on Category Sport
 
**Then:** All category Selected and Highlighted 

**When:** User clicks Apply filters

**Then:** Filter Applyed with function GetResult

**Then:** List with Unchecked Tests refreshed

<br>
**Scenario:** Visiting moderator page on Unchecked tests Tab checking unchecked Test 

**Given:** moderator application with DataBase 

**When:** User clicks on Highlighted text Check Test

**Then:** Redirected on page with Editor of curent test