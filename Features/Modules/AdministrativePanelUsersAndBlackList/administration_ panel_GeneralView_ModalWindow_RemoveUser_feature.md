**Feature:** Modal window to confirm removing user from DataBase in administrative panel

**Scenario:** Try remove user from DataBase with empty input field 

**Given:** Modal window to remove User from DataBase randomized number empty inputfield

**When:** User Clicks Remove

**Then:** User should see message wrong check number

<br>
**Scenario:** Try remove user with wrong inputed digits to check in inputfield

**Given:** Modal window to remove User from DataBase randomized number wrong digits in inputfield

**When:** User Clicks Remove

**Then:** User should see message wrong check number

<br>
**Scenario:** Try remove user with correct inputed digits to check in inputfield

**Given:** Modal window to remove User from DataBase randomized number with correct digits in inputfield

**When:** User Clicks Remove

**Then:** Modal window closed

**Then:** called function deleteUser

**Scenario:** Try remove user with correct inputed digits to check in inputfield or empty form

**Given:** Modal window to remove User from DataBase randomized number with correct digits in inputfield

**When:** User Clicks Cancel

**Then:** Modal window closed

**Then:** called function resetCaptcha