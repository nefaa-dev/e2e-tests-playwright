
@test-organization
Feature: Share Load Plan For User role

    Background:
        Given User Sign In As "Owner" Using Another Account
        And   User Click On Create Load
        And   User Select The Transportation Mode "Land & Sea shipment"
        And   the user selects a CSV file "test-data/valid_csv.csv"
        And   User Set Load Name
        And   User Click On Save and Run Button
        And   User Should Be Redirected To Create Run Page
        And   Container Volume Minimization Is Selected By default
        And   User select container category as "Sea Containers"
        And   User select container name as "20 Standard"
        And   User Click On Next Button
        And   User Select "Instant"
        And   User Set Run Name
        And   User Click On Run Button
        And   Run Should Be Created
        And   Run Should succeed


    @noStorage
    Scenario Outline: [Case_ID_17610] User role should not be able to share load plan from 3D results page

        Given User Click On Log Out
        And   User should be logged out
        And   User Click On Login Button
        And   User Sign In As "User"
        And   User Click On The Load
        And   User Click On Results Button
        And   User Should Be Redirected To Results Page
        When  User Hover The Mouse On Share Load Plan Button
        Then  Share Load Plan Button Should Be Disabled
        And   Tooltip <message> Should Be Displayed

        Examples:
            | message                                                         |
            | "You do not have the necessary permissions to share load plan." |





    @noStorage
    Scenario Outline: [Case_ID_17641] User role should not be able to share load plan from runs page

        Given User Click On Log Out
        And   User should be logged out
        And   User Click On Login Button
        And   User Sign In As "User"
        And   User Click On The Load
        When  User Click On Vertical Ellipsis Of The Run
        Then  Share Load Plan Option Should Be Disabled