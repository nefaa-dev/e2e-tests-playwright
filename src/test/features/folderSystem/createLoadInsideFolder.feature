@test-organization
Feature: Create Load for a Specific Folder

  Background:
    Given a logged user with "Owner" role
    And  User Should Be Redirected To The "Loads" Page
    And  User Already Created Folder
  
  Scenario: [case_id 31105] Create a load for the specific folder

    When User Clicks On The "folder" Button
    And  User Click On Create Load
    Then User Should Be Redirected To The "createLoad" Page
    When the user selects a CSV file "test-data/valid_csv.csv"
    And  User Set Load Name
    And  User Save Load
    Then User Should Be Redirected To The "loads" Page
    When User Clicks On The "folder" Button
    And  User Search For The Load
    Then Load Should Be Saved
    And  The Folder Loads Count Should Be Equal To 1
