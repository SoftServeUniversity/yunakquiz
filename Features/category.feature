Feature: Category page
    In order to see the list of categories and to look through their contents
    As a Guest
    I want to look category page

    Background:
      Given I am on the category page
      And I see the name of the category
      And I see the list of subcategories
      And I see list of tests inside subcategories

    Scenario: category statistics page
      When I click on the link "category_statistics"
      Then I will be redirect to the "category_statistics" page

    Scenario: subcategory page
      When I click on the link "subcategory"
      Then I will be redirect to the "subcategory" page

    Scenario: test page
      When I click on the link "test"
      Then I will be redirect to the "test" page