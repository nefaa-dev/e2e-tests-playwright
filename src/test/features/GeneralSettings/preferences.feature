@active
Feature: Preferences page

  Background:
    Given a logged user with "Owner" role
    And   the user is on the "General Settings" page
    And   the user clicks on the "Preferences" header button

  @test-organization
  Scenario: [case_id 23791] Must be placed on the floor toggle is set to false and disabled
    Then the "Must be placed on the floor" toggle should be "disabled"

  @myriad360
  Scenario: [case_id 23796] Verify the transportation mode dropdown behavior
    Then the "transportation mode" dropdown should be disabled
    And the value of the "transportation mode" should be "SeaAndLand"

  @ups
  Scenario: [case_id 23797] Verify the transportation mode dropdown behavior
    Then the "transportation mode" dropdown should be disabled
    And the value of the "transportation mode" should be "Air"