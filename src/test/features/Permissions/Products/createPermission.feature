@test-organization
Feature: Create Product Permission

    @noStorage
    Scenario Outline: [Case_ID_543] User Role Should Not Be Able To Create Products

        When   User Sign In As <role>
        And    User Click On Library Button
        Then   Add Product Button Should Be disabled


        Examples:
            | role   |
            | "user" |
