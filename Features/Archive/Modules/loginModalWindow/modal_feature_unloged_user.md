**Feature:** modal window contains  title named Login in System at the end contain close button and bellow two input fields one for username or email and seccond for password and checkbox named memorise user and two buttons one SignUp and seccond SignIn

**Scenario:** Tried to Click SignIn with unfilled username or email and password fields and unchecked checkbox named memorise

**Given:** Modal form with unfilled username or email and password fields and unchecked checkbox named memorise

**When:** Click SignIn button

**Then:** Red text error message Wrong Password or Email inputed appears above input mail or username field

<br>
**Scenario:** Tried to Click SignIn with empty password input field and unchecked checkbox named memorise

**Given:**  Modal form with filled up email or user name field and empty password field and unchecked checkbox named memorise

**When:** Click SignIn button

**Then:** Red text error message Wrong Password or Email inputed appears above input mail or username field

<br>
**Scenario:** Tried to Click SignIn with empty email or username input field and unchecked checkbox named memorise

**Given:**  Modal form with filled up password name field and empty email or username input field and unchecked checkbox named memorise

**Then:** Red text error message Wrong Password or Email inputed appears above input mail or username field

<br>
**Scenario:** Tried to Click SignIn with unexisting user and unchecked checkbox named memorise

**Given:**  Modal form with filled up email or username and password fields with unexisting username and unchecked checkbox named memorise

**Then:** Red text error message Wrong Password or Email inputed appears above input mail or username field

<br>
**Scenario:** Tried to Click SignIn with wrong password and unchecked checkbox named memorise

**Given:**  Modal form with filled up email or username and password fields with wrong password and unchecked checkbox named memorise

**Then:** Red text error message Wrong Password or Email inputed appears above input mail or username field and uchecked checkbox memorise

<br>
**Scenario:** Tried to Click SignIn with correct existing filled fields email or username and password and unchecked named checkbox memorise 

**Given:**  Modal form with filled up email or username and password fields with existing user and password and unchecked checkbox named memorise

**Then:** Change login status with role of user call function changeLoginStatus

**And:** Change Login button with small key picture on name of User

<br>
**Scenario:** Tried to Click Close window with unfilled username or email and password fields and unchecked checkbox named memorise

**Given:**  Modal form with unfilled username or email and password fields and unchecked checkbox named memorise

**Then:** close modal form


<br>
**Scenario:** Tried to Click Close window with unfilled username or email field and filled password field and unchecked checkbox named memorise

**Given:**  Modal form with with unfilled username or email field and filled password field and unchecked checkbox named memorise

**Then:** close modal form


<br>
**Scenario:** Tried to Click Close window with filled username or email field and unfilled password field and unchecked checkbox named memorise

**Given:**  Modal form with with filled username or email field and unfilled password field and unchecked checkbox named memorise

**Then:** close modal form


<br>
**Scenario:** Tried to Click SignIn with unfilled username or email and password fields and checked checkbox named memorise

**Given:** Modal form with unfilled username or email and password fields and checked checkbox named memorise

**When:** Click SignIn button

**Then:** Red text error message Wrong Password or Email inputed appears above input mail or username field

<br>
**Scenario:** Tried to Click SignIn with empty password input field and checked checkbox named memorise

**Given:**  Modal form with filled up email or user name field and empty password field and checked checkbox named memorise

**When:** Click SignIn button

**Then:** Red text error message Wrong Password or Email inputed appears above input mail or username field

<br>
**Scenario:** Tried to Click SignIn with empty email or username input field and checked checkbox named memorise

**Given:**  Modal form with filled up password name field and empty email or username input field and checked checkbox named memorise

**Then:** Red text error message Wrong Password or Email inputed appears above input mail or username field

<br>
**Scenario:** Tried to Click SignIn with unexisting user and checked checkbox named memorise

**Given:**  Modal form with filled up email or username and password fields with unexisting username and checked checkbox named memorise

**Then:** Red text error message Wrong Password or Email inputed appears above input mail or username field

<br>
**Scenario:** Tried to Click SignIn with wrong password and checked checkbox named memorise

**Given:**  Modal form with filled up email or username and password fields with wrong password and checked checkbox named memorise

**Then:** Red text error message Wrong Password or Email inputed appears above input mail or username field 

<br>
**Scenario:** Tried to Click SignIn with correct existing filled fields email or username and password and checked named checkbox memorise 

**Given:**  Modal form with filled up email or username and password fields with existing user and password and checked checkbox named memorise

**Then:** Change login status with role of user call function changeLoginStatus

**And:** Change Login button with small key picture on name of User

**And:** memorise user in system

<br>
**Scenario:** Tried to Click Close window with unfilled username or email and password fields and checked checkbox named memorise

**Given:**  Modal form with unfilled username or email and password fields and checked checkbox named memorise

**Then:** close modal form


<br>
**Scenario:** Tried to Click Close window with unfilled username or email field and filled password field and checked checkbox named memorise

**Given:**  Modal form with with unfilled username or email field and filled password field and checked checkbox named memorise

**Then:** close modal form


<br>
**Scenario:** Tried to Click Close window with filled username or email field and unfilled password field and checked checkbox named memorise

**Given:**  Modal form with with filled username or email field and unfilled password field and checked checkbox named memorise

**Then:** close modal form


<br>
**Scenario:** Tried to Click SingUp with filled or not filled fields

**Given:**  Modal form with with filled or not username or email and password fields and checked or not checkbox named memorise

**Then:** close modal form
**And:** redirect to registration.html