@test-organization
Feature: Reactivate Shareable Links

    Background:
        Given  User Created Load
        And    User Created Run Using "20 Standard" In "Land & Sea shipment"
        And    User Shared Load Plan
        And    User Revoked The Shareable Link




    
    Scenario Outline: [Case_ID_17092] Owner role should be able to Reactivate the shareable link

        Given  a logged user with <role> role
        And   User Click On "preferences" On The SideBar
        And   User Click On Shareable Links Tab
        When  User Click On Vertical Ellipsis Of The ShareableLink
        And   User Click On <Option> Option
        And   User Click On Confirm Button For The Shareable Link
        Then  Notification Should Be Displayed With <message>
        And   The Link Status Should Be Updated To <status>
        And   The Shared Results Accessibility Should Behave According To The <status>

        Examples:
            | role      | Option       | message                                  | status   |
            | "Owner"   | "Reactivate" | "Link has been successfully Reactivated" | "Active" |
            