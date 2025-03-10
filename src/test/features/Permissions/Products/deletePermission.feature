@test-organization
Feature: Delete Product Permission


    Background:


        Given User Sign In As "Owner" Using Another Account
        And   User Click On Library Button
        And   Products Library Is Cleaned Up
        And   User Created Product
        And   User Click On Log Out
        And   User should be logged out
        And   User Click On Login Button




    @noStorage
    Scenario Outline: [Case_ID_551] User Role Should Not Be Able To Delete Product

        When   User Sign In As <role>
        And    User Click On Library Button
        Then   Menu Options Should Be disabled

        Examples:
            | role   |
            | "user" |



    @noStorage
    Scenario Outline: [Case_ID_554] User Role Should Not Be Able To Clear Products

        When   User Sign In As <role>
        And    User Click On Library Button
        And    User Check All Products
        Then   Delete Selection Button Should Be Disabled

        Examples:
            | role   |
            | "user" |
