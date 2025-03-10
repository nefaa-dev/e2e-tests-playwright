@test-organization
Feature: Create Folder

  Background:
    Given a logged user with "Owner" role
    And User Should Be Redirected To The "Loads" Page
  
  
  Scenario: [case_id 31103] Verify Create Folder Modal
    When User Clicks On The "add" Button
    Then The Popup Should Be "visible"
    And  The Popup Should Contain The Following Elements:
      | Element     |
      | Folder Name |
      | Cancel      |
      | Save        |

  Scenario: [case_id 31103] User should be able to create a folder

    When User Clicks On The "add" Button
    Then The Popup Should Be "visible"
    When User Sets The Folder Name
    And  User Clicks On The "save" Button
    Then The Popup Should Be "hidden"
    And  Notification Should Pop-Up "Folder has been created successfully"
    And  Folder Should Be Created
    When User Search For The Folder
    Then Folder Should Be "visible" In The Search Results


  Scenario: [case_id 31103] Folder Name Should Be Required

    When User Clicks On The "add" Button
    Then The Popup Should Be "visible"
    When User Sets An Empty Folder Name
    And  User Clicks On The "save" Button
    Then The Popup Should Be "visible"
    When User Hover Over The Folder Name Input
    Then Tooltip "Folder name is required" Should Be Displayed


  Scenario: [case_id 31103] Folder name should be unique

    When User Clicks On The "add" Button
    And  User Sets The Folder Name
    And  User Clicks On The "save" Button
    And  User Clicks On The "add" Button
    And  User Sets The Folder Name
    And  User Clicks On The "save" Button
    Then Notification Should Pop-Up "Folder name is already used"

