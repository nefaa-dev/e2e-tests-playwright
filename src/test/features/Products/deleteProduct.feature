@test-organization
Feature: Delete Product


    Background:

        Given    a logged user with "Owner" role
        And      User Click On Library Button
        And      User Created Product


    Scenario: [Case_ID_550] Owner Should Be Able To Delete Single Product


        When   User Click On Vertical Ellipsis Of The Product
        And    User Click On Delete Option Of The Product
        And    User Click On Delete Button Of The Product
        Then   Product Should Be Deleted

