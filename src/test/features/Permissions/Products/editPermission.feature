@test-organization
Feature: Edit Product Permission


    Background:


        Given User Sign In As "Owner" Using Another Account
        And   User Click On Library Button
        And   Products Library Is Cleaned Up
        And   User Created Product
        And   User Click On Log Out
        And   User should be logged out
        And   User Click On Login Button




    @noStorage
    Scenario Outline: [Case_ID_548] User Role Should Not Be Able To Edit Products

        When   User Sign In As <role>
        And    User Click On Library Button
        Then   Menu Options Should Be disabled

        Examples:
            | role   |
            | "user" |
