@test-organization
Feature: Copy Load

    User Should be able to copy loads

    Background:

        Given a logged user with "Owner" role




    Scenario Outline: [Group_ID_426] User Should Be Able To Copy Loads

        Given  There Is Created Load <File> With <Mode> As Type Of Shipment
        And    User Get CSV Info <File>
        When   User Click On Vertical Ellipsis
        And    User Click On Copy Option
        Then   User Should be Redirected To Copy Page
        When   User Click On Save Load Button
        Then   The Copied Load Should Be Saved
        When   User Click On Vertical Ellipsis
        And    User Click On Load Info Option
        And    User Get Load Info According To <Mode>
        Then   Load Info Should Match CSV Info

        Examples:
            | File                           | Mode                  |
            | "test-data/forCopyLoad_LP.csv" | "Land & Sea shipment" |
            | "test-data/forCopyLoad_UP.csv" | "Land & Sea shipment" |