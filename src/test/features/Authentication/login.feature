@test-organization
Feature: Login

    @smoke
    @noStorage
    Scenario: [case_id 1752] User should be able to login
        When User Enter Username <username>
        And  User Enter Password <password>
        And  User Click On Continue Button
        Then User Should Be Logged In

        Examples:
            | username                              | password   |
            | "deeppack_auto+another@instadeep.com" | "Auto1234" |
