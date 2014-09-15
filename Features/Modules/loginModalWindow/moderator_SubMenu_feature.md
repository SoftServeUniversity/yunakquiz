**Feature:** Moderator menu which displayed next to user name on the right side and have three options Personal settings Moderator Setings and exit

**Scenario:** Logined user with role of moderator tried to click on Personal settings options

**Given:** Logined user with role of moderator

**When:** Click on personal settings options

**Then:** redirect to user\_my\_test\_nyarytc.html.html

<br>
**Scenario:** Logined user with role of moderator tried to click on Moderator settings options

**Given:** Logined user with role of Moderator

**When:** Click Moderator settings options

**Then:** redirect to moderator\_filtertests\_nyarytc.html

<br>
**Scenario:** Logined user with role of moderator tried to click exit options

**Given:** Logined user with role of moderator

**When:** Click on exit options

**Then:** redirect to index.html

**And:** call function logOutModule
