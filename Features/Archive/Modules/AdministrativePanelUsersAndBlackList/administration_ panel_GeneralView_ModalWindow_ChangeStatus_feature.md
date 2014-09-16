**Feature:** Modal window to confirm changing status of user in administrative panel

**Scenario:** Try to change user status with empty digit input field 

**Given:** Modal window to change user status randomized number empty inputfield and any of 3 status of user

**When:** User Clicks Change Status

**Then:** User should see message wrong check number

<br>
**Scenario:** Try to change user status with wrong inputed digits to check in inputfield

**Given:** Modal window to change user status randomized number wrong digits in inputfield and any of 3 status of user

**When:** User Clicks Change Status

**Then:** User should see message wrong check number

<br>
**Scenario:** Try to change user status with correct inputed digits to check in inputfield

**Given:** Modal window to change user status randomized number with correct digits in inputfield and any of 3 status of user

**When:** User Clicks Change Status

**Then:** Modal window closed

**Then:** called function changeStatus

**Scenario:** Try to change user status with correct inputed digits to check in inputfield or empty form

**Given:** Modal window to change user status randomized number with correct digits in inputfield and any of 3 status of user

**When:** User Clicks Cancel

**Then:** Modal window closed

**Then:** called function resetCaptcha