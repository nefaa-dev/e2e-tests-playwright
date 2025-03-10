@test-organization @shari
Feature: Share Load Plan For Owner Role

    Background:
        Given a logged user with "Owner" role
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





    Scenario Outline: [Case_ID_17604] Owner role should be able to share load plan from 3D results page


        Given User Click On Results Button
        And   User Should Be Redirected To Results Page
        When  User Click On Share Load Plan Button
        Then  Notification Should Be Displayed With <message>
        And   User Should Be Able To Access The Shared Load Plan Through The Copied Link
        When  User Click On "preferences" On The SideBar
        And   User Click On Shareable Links Tab
        Then  The Shareable Link Should Be Added

        Examples:
            | role    | message                                    |
            | "Owner" | "A link has been copied to your clipboard" |



    Scenario Outline: [Case_ID_17638] Owner role should be able to share load plan from runs page

        When  User Click On Vertical Ellipsis Of The Run
        And   User Click On Share Load Plan Option
        Then  Notification Should Be Displayed With <message>
        And   User Should Be Able To Access The Shared Load Plan Through The Copied Link
        When  User Click On "preferences" On The SideBar
        And   User Click On Shareable Links Tab
        Then  The Shareable Link Should Be Added

        Examples:
            | role    | message                                    |
            | "Owner" | "A link has been copied to your clipboard" |
