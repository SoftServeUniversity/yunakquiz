**Feature:** Administrator menu which displayed next to user name on the right side and have three options Personal settings Administrative panel and exit

**Scenario:** Logined user with role of administrator tried to click on Personal settings options

**Given:** Logined user with role of administrator

**When:** Click on Administration panel options

**Then:** redirect to administration\_panel.html

<br>
**Scenario:** Logined user with role of administrator tried to click on Personal settings options

**Given:** Logined user with role of administrator

**When:** Click on Personal settings options

**Then:** redirect to user\_my\_test\_nyarytc.html

<br>
**Scenario:** Logined user with role of administrator tried to click exit options

**Given:** Logined user with role of administrator

**When:** Click on exit options

**Then:** redirect to index.html

**And:** call function logOutModule
