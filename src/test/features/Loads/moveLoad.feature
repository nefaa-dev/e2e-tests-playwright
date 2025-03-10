@test-organization
Feature: Move Load to Folder

  Background:
    Given a logged user with "Owner" role
    And  User Should Be Redirected To The "Loads" Page
    And  User Already Created Folder
    And  User Clicks On The "folder" Button
    And  User Click On Create Load
    And  the user selects a CSV file "test-data/valid_csv.csv"
    And  User Set Load Name
    And  User Save Load
    And  User Should Be Redirected To The "loads" Page

  Scenario: [case_id 31106] Successfully move a load from one folder to another
    When User Clicks On The "add" Button
    And  User Sets The New Folder Name
    And  User Clicks On The "save" Button
    And  User Clicks On The "folder" Button
    When User Click On Vertical Ellipsis
    And  User Clicks On The "move" Button
    Then The Popup Should Be "visible"
    When User Clicks On Folders Dropdown
    And  User Selects Another Folder From Dropdown
    And  User Clicks On The "save" Button
    Then Notification Should Pop-Up "Load has been moved successfully"
    And  The Popup Should Be "hidden"
    When User Search For The New Folder
    Then The New Folder Should Be "visible" In The Search Results
    And  User Clicks On The New Folder
    When User Search For The Load
    Then Load Should Be Saved