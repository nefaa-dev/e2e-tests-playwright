@test-organization
Feature: Delete Folder

  Background:
    Given a logged user with "Owner" role
    And User Should Be Redirected To The "Loads" Page
    And  User Already Created Folder

  @session
  Scenario: [case_id 31104] Confirm folder deletion

    When User Clicks On Folder's Actions Button
    And  User Clicks On The "delete" Button
    Then The Popup Should Be "visible"
    When User Clicks On The "confirm" Button
    Then Notification Should Pop-Up "Folder has been successfully deleted"
    And Folder Should Be "hidden" In The Search Results


  Scenario: [case_id 31104] Cancel folder deletion
    When User Clicks On Folder's Actions Button
    And  User Clicks On The "delete" Button
    Then The Popup Should Be "visible"
    When User Clicks On The "cancel" Button
    Then The Popup Should Be "hidden"
    And Folder Should Be "visible" In The Search Results


  Scenario: [case_id 31104] Verify Delete Folder Modal
    When User Clicks On Folder's Actions Button
    And  User Clicks On The "delete" Button
    Then The Popup Should Be "visible"
    And  The Popup Should Contain The Following Elements:
      | Element |
      | Cancel  |
      | delete  |
    And  User Clicks On The "cancel" Button