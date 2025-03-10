@test-organization
Feature: Delete Invitation


    Background:
        Given a logged user with "Owner" role
        And   User Sent Invitation


    
    Scenario: [Case_ID_291] User With Owner Role Should Be Able To Delete Invitation
        When  User Click On Vertical Ellipsis Of The Invitation
        And   User Click On Delete Option Of The Invitation
        When  User Click On Delete Button To Confirm
        Then  Invitation Should Be Deleted