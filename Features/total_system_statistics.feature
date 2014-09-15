Feature: Total statistic of the system
  As a Guest I need to be able to use statistics page to see
  information about passed tests by category and time period,
  overall average score, 
  distribution of scores by age, 
  distribution of scores by user level,
  information about an amount of test tries,
  information about top 10 tests by average user score
  
  Scenario: Statistic page appearance
    Given guest on the "Home" page
    When I click "Statistic" link
    Then I get to "Total statistic of the system" page
    And page's title is "Total statistic of the system"
    And page contains "Tests", "Scores", "Scores/Age", "Scores/Level", "Amount of tries", "Average score" tabs
    And page's active tab by default is "Tests"
    And page contains "From/To" date filter with "Generate chart" button
    
  Scenario: View of passed tests by category and time period chart
    Given guest on the "Total statistic of the system" page
    When  I click "Tests" tab
    And I set date in "From" field
    And I set date in "To" field
    And I click "Generate chart" button
    Then I can see a chart of passed tests by category and time period

  Scenario: View of overall average score by time period chart
    Given guest on the "Total statistic of the system" page
    When I click "Scores" tab
    And  I set date in "From" field
    And I set date in "To" field
    And I click "Generate chart" button
    Then I can see a chart of overall average score by time period

  Scenario: View of distribution of scores by age chart
    Given guest on the "Total statistic of the system" page
    When I click "Scores/Age" tab
    And  I set date in "From" field
    And I set date in "To" field
    And I filter by age 
      | age   |
      | < 14  |
      | 15-18 |
      | 19-25 |
      | > 25  |
    And I click "Generate chart" button
    Then I can see a chart of distribution of scores by age
    
  Scenario: View of distribution of scores by user level chart
    Given guest on the "Total statistic of the system" page
    When I click "Scores/Level" tab
    And  I set date in "From" field
    And I set date in "To" field
    And I filter by level 
      | level   |
      | level 1 |
      | level 2 |
      | level 3 |
      | level 4 |
    And I click "Generate chart" button
    Then I can see a chart of distribution of scores by user level
    
  Scenario: View of top-10 tests by an amount of test tries table
    Given guest on the "Total statistic of the system" page
    When I click "Amount of tries" tab
    Then I can see a table, containing following columns
      | # | Test name | Amount of tries | Average score | Subcategory | Category |
    And there are 10 records in the table sorted by "Amount of tries" in descending order
      
  Scenario: View of top-10 tests by average user score table
    Given guest on the "Total statistic of the system" page
    When I click "Average score" tab
    Then I can see a table, containing following columns
      | # | Test name | Amount of tries | Average score | Subcategory | Category |    
     And there are 10 records in the table sorted by "Average score" in descending order
 
  Scenario: Chart contex menu
    Given guest on the "Total statistic of the system" page
    When I click on "Chart contex menu" button
    Then I see menu, containing following items
     | Print chart | Download PNG image | Download JPEG image | Download PDF image | Download SVG vector image |
     
  Scenario Outline: Print chart
    Given guest on the "Total statistic of the system" page
    When I generate <chart type> chart
    And I click on "Chart contex menu" button
    And I chose "Print chart" item
    Then I see browser's print dialog containing <chart type> to be printed
  
  Examples:
    | chart type                                |
    | passed tests  by category and time period |
    | overall average score by time period      |
    | distribution of scores by age             |
    | distribution of scores by user level      |
    
  Scenario Outline: Save "passed tests by category and time period" chart 
    Given guest on the "Total statistic of the system" page
    When I generate "passed tests by category and time period" chart
    And I click on "Chart contex menu" button
    And I select "Download <file type>" menu item
    Then image with <file type> extension is downloaded
    
  Examples:
    | file type        |
    | PNG image        |
    | JPEG image       |
    | PDF image        |
    | SVG vector image |
    
  Scenario Outline: Save "overall average score by time period" chart
    Given guest on the "Total statistic of the system" page
    When I generate "overall average score by time period" chart
    And I click on "Chart contex menu" button
    And I select "Download <file type>" menu item
    Then image with <file type> extension is downloaded
    
  Examples:
    | file type        |
    | PNG image        |
    | JPEG image       |
    | PDF image        |
    | SVG vector image |
    
  Scenario Outline: Save "distribution of scores by age" chart
    Given guest on the "Total statistic of the system" page
    When I generate "distribution of scores by age" chart
    And I click on "Chart contex menu" button
    And I select "Download <file type>" menu item
    Then image with <file type> extension is downloaded
    
  Examples:
    | file type        |
    | PNG image        |
    | JPEG image       |
    | PDF image        |
    | SVG vector image |
    
  Scenario Outline: Save "distribution of scores by user level" chart
    Given guest on the "Total statistic of the system" page
    When I generate "distribution of scores by user level" chart
    And I click on "Chart contex menu" button
    And I select "Download <file type>" menu item
    Then image with <file type> extension is downloaded
    
  Examples:
    | file type        |
    | PNG image        |
    | JPEG image       |
    | PDF image        |
    | SVG vector image |

