Feature: Profile of other user 
    In order to see information about other user
    As a User
    I want to see the profile of other user

    Scenario: user statistics
      Given I am on the profile of other user
      And I see the avatar of the user
      And I see the field "Имя"
      And I see the field "Станиця"
      And I see the field "Курінь"
      And I see the field "Улад"
      And I see the field "Ступінь"
      And I see the field "Гурток"
      And I see the field "Улад"
      And I see the field "Статус в системі"
      And I see the field "Історія тестів"
      When I click on the link "user_statistics"
      Then I will be redirect to the "user_statistics" page