@test-organization
Feature: Delete Shareable Links

    Background:
        Given  User Created Load
        And    User Created Run Using "20 Standard" In "Land & Sea shipment"
        And    User Shared Load Plan


    Scenario Outline: [Case_ID_17090] Owner role should be able to Delete the shareable link

        Given  a logged user with <role> role
        And   User Click On "preferences" On The SideBar
        And   User Click On Shareable Links Tab
        And   The Shareable Link Should Be Added
        When  User Click On Vertical Ellipsis Of The ShareableLink
        And   User Click On <Option> Option
        And   User Click On Confirm Button For The Shareable Link
        Then  Notification Should Be Displayed With <message>
        And   The Shareable Link Should Be Deleted

        Examples:
            | role      | Option   | message                 |
            | "Owner"   | "Delete" | "Link has been deleted" |
            
