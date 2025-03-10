@test-organization
Feature: Send Invitation

  Owner role should be able to send invitations to new users


  Background:
    
    Given a logged user with "Owner" role


  @testinvi
  Scenario: [Case_ID_300] User With Owner Role Should Be Able To Send Invitation

    When  User Click On Manage Organization
    And   User Click On Invitation Tab
    And   User Click On Invite User Button
    And   User Enter Email
    And   User Click On Send Button
    Then  Invitation Should Be Sent