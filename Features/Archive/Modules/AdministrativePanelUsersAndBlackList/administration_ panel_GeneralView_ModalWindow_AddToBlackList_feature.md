**Feature:** Modal window to confirm addition user to BlackList in administrative panel

**Scenario:** Try to add user to BlackList with empty input field 

**Given:** Modal window to add User to BlackList randomized number empty inputfield

**When:** User Clicks Add

**Then:** User should see message wrong check number

<br>
**Scenario:** Try add user to BlackList with wrong inputed digits to check in inputfield

**Given:** Modal window to add User to BlackList randomized number wrong digits in inputfield

**When:** User Clicks Add

**Then:** User should see message wrong check number

<br>
**Scenario:** Try add user to BlackList with correct inputed digits to check in inputfield

**Given:** Modal window to add User to BlackList randomized number with correct digits in inputfield

**When:** User Clicks Add

**Then:** Modal window closed

**Then:** called function baned

**Scenario:** Try add user to BlackList with correct inputed digits to check in inputfield or empty form

**Given:** Modal window to add User to BlackList randomized number with correct digits in inputfield

**When:** User Clicks Cancel

**Then:** Modal window closed

**Then:** called function resetCaptcha