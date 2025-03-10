@test-organization
Feature: Edit Load

    User Should be able to copy loads

    Background:

        Given a logged user with "Owner" role
        And   There Is Created Load "test-data/forEditLoad.csv" With "Land & Sea shipment" As Type Of Shipment
        And   User Get CSV Info "test-data/editedLoad.csv"



    Scenario: [Case_ID_41] User Should Be Able To Edit loads

        When   User Click On Vertical Ellipsis
        And    User Click On Edit Option
        Then   User Should be Redirected To Edit Page
        And    <DefaultMode> Transportation Mode Is Selected By Default
        When   User Select The Transportation Mode <Mode>
        And    User Edit The Load
        And    User Click On Update Load Button From Edit Page
        Then   Load Should Be Saved
        When   User Click On Vertical Ellipsis
        And    User Click On Load Info Option
        And    User Get Load Info According To <Mode>
        Then   Load Info Should Match CSV Info


        Examples:
            | Mode                  | DefaultMode           |
            | "Land & Sea shipment" | "Land & Sea shipment" |