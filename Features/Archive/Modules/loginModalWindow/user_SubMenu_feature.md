**Feature:** User menu which displayed next to user name on the right side and have two options Personal settings  and exit

**Scenario:** Logined user with role of user tried to click on Personal settings options

**Given:** Logined user with role of user

**When:** Click on personal settings options

**Then:** redirect to user\_my\_test\_nyarytc.html

<br>
**Scenario:** Logined user with role of user tried to click exit options

**Given:** Logined user with role of user

**When:** Click on exit options

**Then:** redirect to index.html

**And:** call function logOutModule
